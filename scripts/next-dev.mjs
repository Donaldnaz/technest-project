import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const lockPath = path.join(process.cwd(), ".next/dev/lock");

function readLock() {
  try {
    return JSON.parse(fs.readFileSync(lockPath, "utf8"));
  } catch {
    return null;
  }
}

function isProcessRunning(pid) {
  if (!pid || typeof pid !== "number") return false;

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function removeLock() {
  try {
    fs.unlinkSync(lockPath);
  } catch {
    // Lock already removed.
  }
}

function stopExistingDevServer() {
  const lock = readLock();
  if (!lock?.pid) return { stopped: false, reason: "no-lock" };

  if (!isProcessRunning(lock.pid)) {
    removeLock();
    return { stopped: false, reason: "stale-lock-cleared", pid: lock.pid };
  }

  console.log(`Stopping existing dev server (PID ${lock.pid})...`);

  try {
    process.kill(lock.pid, "SIGTERM");
  } catch {
    removeLock();
    return { stopped: false, reason: "kill-failed", pid: lock.pid };
  }

  const deadline = Date.now() + 3000;
  while (Date.now() < deadline && isProcessRunning(lock.pid)) {
    // Wait for graceful shutdown.
  }

  if (isProcessRunning(lock.pid)) {
    try {
      process.kill(lock.pid, "SIGKILL");
    } catch {
      // Fall through to lock cleanup attempt.
    }
  }

  removeLock();
  return { stopped: true, reason: "stopped-running-server", pid: lock.pid };
}

stopExistingDevServer();

const cwd = process.cwd();
const nextBinPath = path.join(cwd, "node_modules/.bin/next");
const nextBinExists = fs.existsSync(nextBinPath);

const spawnCommand = nextBinExists
  ? nextBinPath
  : process.platform === "win32"
    ? "npx.cmd"
    : "npx";
const spawnArgs = nextBinExists
  ? ["dev", ...process.argv.slice(2)]
  : ["next", "dev", ...process.argv.slice(2)];

const child = spawn(spawnCommand, spawnArgs, {
  stdio: "inherit",
  cwd,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
