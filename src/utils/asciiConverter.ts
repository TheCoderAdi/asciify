import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";
import slant from "figlet/importable-fonts/Slant.js";
import banner from "figlet/importable-fonts/Banner.js";
import big from "figlet/importable-fonts/Big.js";
import block from "figlet/importable-fonts/Block.js";
import doom from "figlet/importable-fonts/Doom.js";
import small from "figlet/importable-fonts/Small.js";
import digital from "figlet/importable-fonts/Digital.js";
import script from "figlet/importable-fonts/Script.js";
import shadow from "figlet/importable-fonts/Shadow.js";
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
