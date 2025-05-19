export type ThemePreset = {
  name: string;
  textColor: string;
  backgroundColor: string;
  glowColor: string;
  font: string;
  crt: boolean;
};

export const presets: ThemePreset[] = [
  {
    name: "Matrix",
    textColor: "text-terminal-green",
    backgroundColor: "bg-terminal-black",
    glowColor: "shadow-terminal-green",
    font: "Standard",
    crt: true,
  },
  {
    name: "NeoNoir",
    textColor: "text-terminal-blue",
    backgroundColor: "bg-terminal-deep-black",
    glowColor: "shadow-terminal-blue",
    font: "Slant",
    crt: true,
  },
  {
    name: "Arcade Blast",
    textColor: "text-terminal-purple",
    backgroundColor: "bg-terminal-black",
    glowColor: "shadow-terminal-purple",
    font: "Block",
    crt: true,
  },
  {
    name: "DOS Classic",
    textColor: "text-white",
    backgroundColor: "bg-terminal-deep-black",
    glowColor: "shadow-none",
    font: "Small",
    crt: false,
  },
  {
    name: "Soviet Terminal",
    textColor: "text-terminal-orange",
    backgroundColor: "bg-terminal-black",
    glowColor: "shadow-terminal-orange",
    font: "Calvin S",
    crt: true,
  },
];

export const getPresetByName = (name: string): ThemePreset => {
  return presets.find((preset) => preset.name === name) || presets[0];
};
