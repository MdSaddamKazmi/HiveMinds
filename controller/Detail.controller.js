sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("my.Test.controller.Detail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var selectedArguments = oEvent.getParameter("arguments");
			var selectedRecord = JSON.parse(selectedArguments.invoicePath);

			var obj = {
				"invoicePath": selectedRecord
			};
			var navigationobjModel = new JSONModel();
			navigationobjModel.setData(obj);
			this.getView().setModel(navigationobjModel);

		},

		/*
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").invoicePath,
				model: "invoice"
			});
		}, */

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
			/*	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("app", null, "true"); */
				this.getOwnerComponent().getRouter().navTo("app", null, true);

			}
		}
	});
});