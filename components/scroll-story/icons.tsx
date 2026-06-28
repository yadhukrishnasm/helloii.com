import type React from "react";
import type { StepIconName } from "./data/how-it-works";
import type { StatIconName } from "./data/product-flows";

type IconProps = { color: string };

function InstallIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M12 3v12m0 0-4-4m4 4 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SyncIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M4 12a8 8 0 0 1 14-5.3L20 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4v4h-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12a8 8 0 0 1-14 5.3L4 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20v-4h4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M4 5h16v11H9l-4 4V5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 10h8M8 13h5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrowthIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="46%" height="46%">
      <path
        d="M4 18 9 12l4 3 7-8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7h4v4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STEP_ICONS: Record<StepIconName, React.FC<IconProps>> = {
  install: InstallIcon,
  sync: SyncIcon,
  chat: ChatIcon,
  growth: GrowthIcon,
};

export function StepIcon({
  name,
  color,
}: {
  name: StepIconName;
  color: string;
}) {
  const Icon = STEP_ICONS[name];
  return <Icon color={color} />;
}

function ClockIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8" />
      <path
        d="M12 7.5V12l3 2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TicketIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <path
        d="M3.5 9a2 2 0 0 1 0-4h17a2 2 0 0 1 0 4 2 2 0 0 0 0 6 2 2 0 0 1 0 4h-17a2 2 0 0 1 0-4 2 2 0 0 0 0-6Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 7v10"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

function SparkIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <path
        d="M12 3.5l1.9 6 6 1.9-6 1.9-1.9 6-1.9-6-6-1.9 6-1.9 1.9-6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon({ color }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.2" fill={color} />
    </svg>
  );
}

const STAT_ICONS: Record<StatIconName, React.FC<IconProps>> = {
  clock: ClockIcon,
  chat: ChatIcon,
  ticket: TicketIcon,
  spark: SparkIcon,
  target: TargetIcon,
};

export function StatIcon({
  name,
  color,
}: {
  name: StatIconName;
  color: string;
}) {
  const Icon = STAT_ICONS[name];
  return <Icon color={color} />;
}
