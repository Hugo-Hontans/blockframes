import { toDate } from '../helpers';

export const paymentEvent = {
  ContractSignatureDate: 'Contract Signature Date',
  AcceptationAllMaterials: 'Acceptation of all delivery materials',
  InvoiceEmittedDate: 'Invoice emission date',
} as const;

export type PaymentEvent = keyof typeof paymentEvent;
export type PaymentEventValue = typeof paymentEvent[PaymentEvent];

export const movieEvent = {
  WordlPremiere: 'World Premiere',
  FirstTheatricalRelease: 'First theatrical release',
  FirstTvBroadcast: 'First TV broadcast',
} as const;

export type MovieEvent = keyof typeof movieEvent;
export type MovieEventValue = typeof movieEvent[MovieEvent];

export const timeUnit = {
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
  years: 'Years',
  calendarSemester: 'Calendar Semester',
  calendarQuarter: 'Calendar Quarter'
} as const;

export type TimeUnit = keyof typeof timeUnit;
export type TimeUnitValue = typeof timeUnit[TimeUnit];

export const temporalityUnit = {
  after: 'After',
  before: 'Before',
  for: 'For',
  every: 'Every'
} as const;

export type TemporalityUnit = keyof typeof temporalityUnit;
export type TemporalityUnitValue = typeof temporalityUnit[TemporalityUnit];

export interface FloatingDuration {
  label?: string;
  duration?: number;
  unit?: TimeUnit,
  temporality?: TemporalityUnit,
}

export interface TermsRaw<D> {
  start?: D;
  approxStart?: string;
  /**
   * @example: 3 months around start
   */
  startLag?: string;
  end?: D;
  approxEnd?: string;
  /**
   * @example: 3 months around end
   */
  endLag?: string;
  /**
   * @example: 7 months after theatrical release
   */
  floatingStart?: MovieEvent | PaymentEvent;
  /**
   * @example: 1 year after floatingStart event occured
   */
  floatingDuration?: FloatingDuration;
}

export interface ScheduledDateRaw<D> extends TermsRaw<D> {
  dueDate: D,
  period: FloatingDuration,
}

/**
 * A ScheduledDateRaw interface with a counter to keep schedule order
 */
export interface ScheduledDateWithCounterRaw<D> extends ScheduledDateRaw<D> {
  count: number;
}

export interface Terms extends TermsRaw<Date> {
}

export interface ScheduledDate extends ScheduledDateRaw<Date> {
}

export interface ScheduledDateWithCounter extends ScheduledDateWithCounterRaw<Date> {
}

export function createFloatingDuration(params: Partial<FloatingDuration> = {}): FloatingDuration {
  return {
    ...params
  };
}

export function createTerms(params: Partial<Terms> = {}): Terms {
  return {
    ...params
  };
}

export function formatTerms(terms: any): Terms {
  const t = {
    ...terms,
  }

  if (terms.start) {
    t.start = toDate(terms.start);
  }


  if (terms.end) {
    t.end = toDate(terms.end);
  }

  return t;
}

export function createScheduledDate(params: Partial<ScheduledDate> = {}): ScheduledDate {
  return {
    dueDate: new Date(),
    ...params,
    period: createFloatingDuration(params.period),
  };
}

export function formatScheduledDate(scheduledDate: any): ScheduledDate {
  return {
    ...scheduledDate,
    ...formatTerms(scheduledDate),
    dueDate: toDate(scheduledDate.dueDate)
  }
}

export function createScheduledDateWithCounter(params: Partial<ScheduledDateWithCounter> = {}): ScheduledDateWithCounter {
  return {
    count: 0,
    ...params,
    ...createScheduledDate(params),
  };
}

export function termToPrettyDate(term: Terms, type: 'start' | 'end' = 'start'): string {
  const noDate = 'no date';
  switch (type) {
    case 'start':
      if (!term.start || isNaN(term.start.getTime())) {
        return term.approxStart || noDate;
      } else if (term.start) {
        return term.start.toLocaleDateString();
      } else {
        return noDate;
      }
    case 'end':
    default:
      if (!term.end || isNaN(term.end.getTime())) {
        return term.approxEnd || noDate;
      } else if (term.end) {
        return term.end.toLocaleDateString();
      } else {
        return noDate;
      }
  }
}

/** Check if termsA is in range of termsB */
export function inDateRange(termsA: any, termsB: any): boolean {

  if (termsA && termsB) {
    termsA = formatTerms(termsA);
    termsB = formatTerms(termsB);;
  }
  return (
    (termsA.start.getTime() >= termsB.start.getTime() &&
      termsA.start.getTime() <= termsB.end.getTime()) &&
    (termsA.end.getTime() >= termsB.start.getTime() &&
      termsA.end.getTime() <= termsB.end.getTime())
  )
}
