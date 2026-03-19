export function getPayoutForTrigger(triggerEvents, triggerId, planId) {
  const triggerEvent = triggerEvents.find((event) => event.id === triggerId);

  if (!triggerEvent || !triggerEvent.payoutByPlan[planId]) {
    return 0;
  }

  return triggerEvent.payoutByPlan[planId];
}

export function applyTriggerToEarnings(currentAmount, payoutAmount) {
  return currentAmount + payoutAmount;
}
