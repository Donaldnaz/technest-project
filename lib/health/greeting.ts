export function getTimeOfDayGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getGreetingGradient(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) {
    return "from-teal-100/80 via-sage-50 to-oat-100 dark:from-teal-950/40 dark:via-charcoal-900 dark:to-amber-950/20";
  }
  if (hour < 17) {
    return "from-sage-100/90 via-oat-50 to-lavender-100/60 dark:from-sage-950/30 dark:via-charcoal-900 dark:to-teal-950/30";
  }
  return "from-lavender-100/70 via-oat-100 to-terracotta-100/40 dark:from-charcoal-950 dark:via-charcoal-900 dark:to-amber-950/25";
}

export function getFirstName(fullName: string | null | undefined): string {
  if (!fullName?.trim()) return "there";
  return fullName.trim().split(/\s+/)[0] ?? "there";
}
