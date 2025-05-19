import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  onRandomText: () => void;
  placeholder?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onRandomText,
  placeholder = "Enter some text to ASCIIfy...",
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="input-text"
          className="text-sm font-medium text-terminal-green"
        >
          &gt; INPUT
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRandomText}
          className="text-terminal-green/80 hover:text-terminal-green hover:bg-terminal-green/10"
        >
          Random Text
        </Button>
      </div>
      <Textarea
        id="input-text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[150px] bg-terminal-deep-black border-terminal-green/30 focus:border-terminal-green text-terminal-green font-mono"
      />
      <div className="text-xs text-terminal-green-muted mt-1">
        Type something to see it transformed into ASCII art
      </div>
    </div>
  );
};

export default TextInput;
