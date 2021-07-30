const loglevel = process.env.LOGLEVEL || "tract";

module.exports = {
  logger: require("tracer").console({
    format: ["{{timestamp}} [{{title}}] {{file}}:{{line}} : {{message}}"],
    preprocess: (data) => {
      data.title = data.title.toUpperCase();
    },
    dateformat: "isoUtcDateTime",
    level: loglevel,
  }),
};
