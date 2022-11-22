const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res, next) => {
  try {
    // const localization = await localizationService.getLocalization(
    //   req.params.locale
    // );
    let localization;
    // if (!localization) {
    //   const data = fs.readFileSync(
    //     path.format({
    //       root: "/localization/",
    //       name: locale,
    //       ext: ".txt",
    //     }),
    //     {
    //       encoding: "utf8",
    //     }
    //   );
    //   let localization = {};
    //   data.split("\n").forEach((row) => {
    //     const splittedRow = row.split("=");
    //     localization[splittedRow[0]] = splittedRow[1];
    //   });
    //   localization = {
    //     locale,
    //     localizations: localization,
    //   };
    //   return localization;
    // }

    console.log(localization);

    // if (!localization) {
    //   throw createError(404, "localization.not.found");
    // }
    // res.json(localization);
  } catch (error) {
    //   next(error);
  }
});

module.exports = router;
