import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { generateAscii } from "../utils/asciiConverter";
import CrtEffect from "./CrtEffect";

type AsciiRendererProps = {
  text: string;
  font: string;
  textColor: string;
  backgroundColor: string;
  glowColor: string;
  crtEnabled: boolean;
};

const AsciiRenderer: React.FC<AsciiRendererProps> = ({
  text,
  font,
  textColor,
  backgroundColor,
  glowColor,
  crtEnabled,
}) => {
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateAscii = async () => {
      if (!text) {
        setAsciiArt("");
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await generateAscii(text, font);

        if (typeof result === "string" && result.startsWith("Error:")) {
          setError(result);
          const fallbackResult = await generateAscii(text, "Standard");
          if (
            typeof fallbackResult === "string" &&
            !fallbackResult.startsWith("Error:")
          ) {
            setError("Using fallback font 'Standard'");
            setAsciiArt(fallbackResult as string);
          } else {
            setAsciiArt("");
          }
        } else if (typeof result === "string") {
          setAsciiArt(result as string);
        }
      } catch (error) {
        console.error("Error generating ASCII:", error);
        setError("Could not generate ASCII art. Try a different font.");
        setAsciiArt("");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      updateAscii();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [text, font]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(asciiArt);
    toast.success("ASCII art copied to clipboard!");
  };

  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([asciiArt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ascii-art.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("ASCII art downloaded as .txt file!");
  };

  const downloadAsPng = () => {
    const canvas = document.getElementById("ascii-canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;

    const lines = asciiArt.split("\n");
    const fontSize = 14;
    const lineHeight = fontSize * 1.4;
    const fontFamily = "monospace";

    const canvasWidth =
      Math.max(...lines.map((line) => line.length)) * (fontSize * 0.6);
    const canvasHeight = lines.length * lineHeight + 20;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = "#00FF00";
    context.font = `${fontSize}px ${fontFamily}`;

    lines.forEach((line, index) => {
      context.fillText(line, 10, (index + 1) * lineHeight);
    });

    const link = document.createElement("a");
    link.download = "ascii-art.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    toast.success("ASCII art downloaded as PNG image!");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-terminal-green">
          &gt; OUTPUT
        </label>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            disabled={!asciiArt}
            className="text-terminal-green/80 hover:text-terminal-green hover:bg-terminal-green/10"
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadAsTxt}
            disabled={!asciiArt}
            className="text-terminal-green/80 hover:text-terminal-green hover:bg-terminal-green/10"
          >
            Download
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={downloadAsPng}
            disabled={!asciiArt}
            className="text-terminal-green/80 hover:text-terminal-green hover:bg-terminal-green/10"
          >
            PNG
          </Button>
        </div>
      </div>

      <CrtEffect enabled={crtEnabled}>
        <div
          className={`min-h-[250px] p-4 font-mono overflow-auto ${backgroundColor} rounded-md border border-terminal-green/30`}
        >
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className={`${textColor} animate-pulse`}>Generating...</div>
            </div>
          ) : asciiArt ? (
            <>
              {error && (
                <div className="text-amber-500 text-xs mb-2">{error}</div>
              )}
              <pre
                className={`ascii-art ${textColor} ${
                  glowColor ? `${glowColor} text-shadow` : ""
                }`}
              >
                {asciiArt}
              </pre>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-terminal-green-muted">
                ASCII output will appear here
              </div>
              {error && (
                <div className="text-amber-500 mt-2 text-center max-w-lg">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </CrtEffect>
      <canvas id="ascii-canvas" className="hidden" />
    </div>
  );
};

export default AsciiRenderer;
