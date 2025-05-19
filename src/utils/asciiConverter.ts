import figlet from "figlet";

// @ts-expect-error type
import standard from "figlet/importable-fonts/Standard.js";
// @ts-expect-error type
import slant from "figlet/importable-fonts/Slant.js";
// @ts-expect-error type
import banner from "figlet/importable-fonts/Banner.js";
// @ts-expect-error type
import big from "figlet/importable-fonts/Big.js";
// @ts-expect-error type
import block from "figlet/importable-fonts/Block.js";
// @ts-expect-error type
import doom from "figlet/importable-fonts/Doom.js";
// @ts-expect-error type
import small from "figlet/importable-fonts/Small.js";
// @ts-expect-error type
import digital from "figlet/importable-fonts/Digital.js";
// @ts-expect-error type
import script from "figlet/importable-fonts/Script.js";
// @ts-expect-error type
import shadow from "figlet/importable-fonts/Shadow.js";
// @ts-expect-error type
import mini from "figlet/importable-fonts/Mini.js";

figlet.parseFont("Standard", standard);
figlet.parseFont("Slant", slant);
figlet.parseFont("Banner", banner);
figlet.parseFont("Big", big);
figlet.parseFont("Block", block);
figlet.parseFont("Doom", doom);
figlet.parseFont("Small", small);
figlet.parseFont("Digital", digital);
figlet.parseFont("Script", script);
figlet.parseFont("Shadow", shadow);
figlet.parseFont("Mini", mini);

export const fontStyles = [
  "Standard",
  "Slant",
  "Banner",
  "Big",
  "Block",
  "Doom",
  "Small",
  "Digital",
  "Script",
  "Shadow",
  "Mini",
];

export const generateAscii = async (
  text: string,
  font: string = "Standard"
) => {
  try {
    return new Promise((resolve) => {
      const validFont = fontStyles.includes(font) ? font : "Standard";

      figlet.text(
        text || "ASCIIfy",
        {
          font: validFont as figlet.Fonts,
          horizontalLayout: "default",
          verticalLayout: "default",
        },
        function (err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
          console.log(data);
          resolve(data || "Error");
        }
      );
    });
  } catch (error) {
    console.error("Error generating ASCII:", error);
    return `Error: Could not render "${text}" as ASCII`;
  }
};

export const getCharacterWidth = (font: string) => {
  switch (font) {
    case "Big":
    case "Block":
    case "Epic":
      return 10;
    case "3D-ASCII":
    case "ANSI Shadow":
    case "Doom":
      return 8;
    default:
      return 6;
  }
};
