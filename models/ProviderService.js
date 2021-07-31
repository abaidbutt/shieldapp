const mongoose = require("mongoose");

const providerServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProviderService = mongoose.model("ProviderService", providerServiceSchema);

module.exports = ProviderService;
