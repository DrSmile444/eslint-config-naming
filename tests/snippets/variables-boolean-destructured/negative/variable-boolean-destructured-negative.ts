interface FlagsDirect {
  enabled: boolean;
  visible: boolean;
}

const flagsDirect: FlagsDirect = {
  enabled: true,
  visible: false,
};

// Not destructured, so prefix required
const enabled: boolean = flagsDirect.enabled; // Missing boolean prefix
const visible: boolean = flagsDirect.visible; // Missing boolean prefix

