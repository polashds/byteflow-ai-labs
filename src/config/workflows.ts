/*
 * Copy for the animated, illustrative workflow diagrams and the hero type
 * rotator. Diagrams describe how the systems we build are designed to
 * behave; they are not a live deployment or a measured result. Keep the
 * caption on every diagram.
 */

export interface WorkflowStep {
  title: string;
  note: string;
}

export interface Workflow {
  /** Short label shown above the steps. */
  label: string;
  /** Section heading and intro, used where the diagram has its own section. */
  eyebrow: string;
  heading: string;
  intro: string;
  steps: WorkflowStep[];
}

export const workflowCaption = "Illustrative workflow, not a live deployment.";

/** Controls and status pills inside the diagram. */
export const workflowUi = {
  pause: "Pause animation",
  play: "Play animation",
  running: "Running",
  done: "Done",
} as const;

export const leadWorkflow: Workflow = {
  label: "Lead flow",
  eyebrow: "How it runs",
  heading: "Follow a lead through the system",
  intro:
    "Each step is a part of the workflow we build and hand over to you. Your team can see each step and step in when needed.",
  steps: [
    { title: "Lead arrives", note: "From an ad form, your website or WhatsApp" },
    { title: "First reply", note: "An automatic WhatsApp message in your wording" },
    { title: "Scored and saved", note: "Rules you can read, saved to your CRM" },
    { title: "Team alerted", note: "The assigned person gets the details" },
    { title: "Follow-up", note: "Stops when the lead replies or books" },
  ],
};

export const paymentWorkflow: Workflow = {
  label: "Payment check flow",
  eyebrow: "How it runs",
  heading: "Follow a payment screenshot through the system",
  intro:
    "Each step is a part of the workflow we build and hand over to you. Anything unclear goes to a person on your team.",
  steps: [
    { title: "Screenshot received", note: "The customer sends it on WhatsApp" },
    { title: "Read", note: "Amount and transaction reference" },
    { title: "Matched to order", note: "Checked against your order records" },
    { title: "Duplicate check", note: "The reference has not been used before" },
    { title: "Confirmed or sent to staff", note: "Unclear cases go to a person" },
  ],
};

export const workflows = { lead: leadWorkflow, payment: paymentWorkflow } as const;
export type WorkflowKey = keyof typeof workflows;

/** Homepage hero type rotator: "> automating <phrase>". */
export const heroRotator = {
  prefix: "automating",
  srLabel: "Systems we build automate",
  phrases: [
    "lead replies",
    "CRM updates",
    "team alerts",
    "follow-up messages",
    "payment checks",
    "order confirmations",
  ],
} as const;
