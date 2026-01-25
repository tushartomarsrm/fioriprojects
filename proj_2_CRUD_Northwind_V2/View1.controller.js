sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("masterdetail.masterdetail.controller.View1", {

        onInit: function () {
            var oUIModel = new sap.ui.model.json.JSONModel({
                editRowId: null
            });
            this.getView().setModel(oUIModel, "ui");
        },

        onEdit: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            var iId = oContext.getProperty("ID");
            this.getView().getModel("ui").setProperty("/editRowId", iId);
        },

        onSave: function () {
            var oModel = this.getView().getModel();
            var oUIModel = this.getView().getModel("ui");

            oModel.submitChanges({
                success: function () {
                    MessageToast.show("Product updated successfully");
                    oUIModel.setProperty("/editRowId", null);
                },
                error: function () {
                    MessageToast.show("Update failed");
                }
            });
        },

        onDelete: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            var oModel = this.getView().getModel();

            oModel.remove(oContext.getPath(), {
                success: function () {
                    MessageToast.show("Product deleted");
                },
                error: function () {
                    MessageToast.show("Delete failed");
                }
            });
        },

        onDuplicate: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            if (!oContext) {
                MessageToast.show("Context missing");
                return;
            }

            var oData = oContext.getObject();
            var oModel = this.getView().getModel();

            var oNewProduct = {
                ID: String(Math.floor(Math.random() * 100000)),
                Name: oData.Name,
                Price: oData.Price.toString(),
                Rating: oData.Rating
            };

            oModel.create("/Products", oNewProduct, {
                success: function () {
                    MessageToast.show("Product duplicated successfully");
                },
                error: function () {
                    MessageToast.show("Duplicate failed");
                }
            });
        },

        _generateUniqueId: function () {
            return Math.floor(Math.random() * 1000000);
        }

    });
});
