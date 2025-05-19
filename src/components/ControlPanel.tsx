import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { fontStyles } from "../utils/asciiConverter";
import { presets } from "../utils/presets";

type ControlPanelProps = {
  font: string;
  setFont: (font: string) => void;
  preset: string;
  setPreset: (preset: string) => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean) => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  font,
  setFont,
  preset,
  setPreset,
  crtEnabled,
  setCrtEnabled,
}) => {
  return (
    <div className="p-4 bg-terminal-black/50 border border-terminal-green/20 rounded-md">
      <h2 className="text-terminal-green mb-4 font-bold">Control Panel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="preset-select"
            className="text-sm text-terminal-green"
          >
            Style Preset
          </label>
          <Select value={preset} onValueChange={setPreset}>
            <SelectTrigger
              id="preset-select"
              className="bg-terminal-deep-black border-terminal-green/30 text-terminal-green"
            >
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent className="bg-terminal-deep-black border-terminal-green/30 text-terminal-green">
              {presets.map((p) => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="font-select" className="text-sm text-terminal-green">
            ASCII Font
          </label>
          <Select value={font} onValueChange={setFont}>
            <SelectTrigger
              id="font-select"
              className="bg-terminal-deep-black border-terminal-green/30 text-terminal-green"
            >
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent className="bg-terminal-deep-black border-terminal-green/30 text-terminal-green">
              {fontStyles.map((font: string) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="crt"
            checked={crtEnabled}
            onCheckedChange={setCrtEnabled}
            className="data-[state=checked]:bg-terminal-green"
          />
          <Label htmlFor="crt" className="text-terminal-green">
            CRT Effect
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
