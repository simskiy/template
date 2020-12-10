"use strict";

module.exports = {
  outputStyle: "scss",
  filename: "_smart-grid",
  columns: 12, // number of grid columns
  offset: "30px", // gutter width - 30px
  mobileFirst: true,
  mixinNames: {
    container: "container"
  },
  container: {
    fields: "15px", // side fields - 15px
  },
  breakPoints: {
    xs: {
      width: "320px" // 320px
    },
    sm: {
      width: "576px" // 576px
    },
    md: {
      width: "768px" // 768px
    },
    lg: {
      width: "992px" // 992px
    },
    xl: {
      width: "1150px" // 1150px
    }
  }
};
