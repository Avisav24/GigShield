export const languageModes = {
  ENGLISH: "english",
  HINDI: "hindi",
  HINGLISH: "hinglish",
};

export function selectLabel(languageMode, english, hindi, hinglish = english) {
  if (languageMode === languageModes.HINDI) {
    return hindi;
  }

  if (languageMode === languageModes.HINGLISH) {
    return hinglish;
  }

  return english;
}
