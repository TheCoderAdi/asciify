import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import AsciiRenderer from "./components/AsciiRenderer";
import ControlPanel from "./components/ControlPanel";
import { getPresetByName } from "./utils/presets";

const sampleTexts = [
  "Hello, World!",
  "ASCIIfy",
  "Retro Terminal",
  "ASCII Art",
  "Cyberpunk 2077",
  "Matrix",
];

const App = () => {
  const [inputText, setInputText] = useState<string>("");
  const [font, setFont] = useState<string>("Standard");
  const [preset, setPreset] = useState<string>("Matrix");
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);

  useEffect(() => {
    const currentPreset = getPresetByName(preset);
    setFont(currentPreset.font);
    setCrtEnabled(currentPreset.crt);

    if (!inputText) {
      setRandomText();
    }
  }, [preset]);

  const setRandomText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setInputText(sampleTexts[randomIndex]);
  };

  const handlePresetChange = (presetName: string) => {
    const selectedPreset = getPresetByName(presetName);
    setPreset(presetName);
    setFont(selectedPreset.font);
    setCrtEnabled(selectedPreset.crt);
    toast(`Applied "${presetName}" preset`);
  };

  const currentPreset = getPresetByName(preset);

  return (
    <div className="min-h-screen bg-terminal-deep-black flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        <div className="max-w-8xl mx-auto p-4">
          <ControlPanel
            font={font}
            setFont={setFont}
            preset={preset}
            setPreset={handlePresetChange}
            crtEnabled={crtEnabled}
            setCrtEnabled={setCrtEnabled}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TextInput
              value={inputText}
              onChange={setInputText}
              onRandomText={setRandomText}
            />
            <AsciiRenderer
              text={inputText}
              font={font}
              textColor={currentPreset.textColor}
              backgroundColor={currentPreset.backgroundColor}
              glowColor={currentPreset.glowColor}
              crtEnabled={crtEnabled}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
