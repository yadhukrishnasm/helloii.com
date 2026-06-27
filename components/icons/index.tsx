function InstallIcon({ color }: { color: string }) {
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

function SyncIcon({ color }: { color: string }) {
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

function ChatIcon({ color }: { color: string }) {
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

function GrowthIcon({ color }: { color: string }) {
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

export { GrowthIcon, ChatIcon, SyncIcon, InstallIcon };
