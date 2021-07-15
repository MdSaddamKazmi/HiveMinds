sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
], function (Controller, JSONModel, Filter, FilterOperator, Sorter) {
	"use strict";

	return Controller.extend("my.Test.controller.App", {

		onInit: function () {

			// set data model on view
			var oData = {
				recipient: {
					name: "Test"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);

			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.fnApplyFiltersAndOrdering();

			var oModel1 = new sap.ui.model.json.JSONModel({
				Skills: [{
						"Technical_Skill": "OO_ABAP",
						"Value": "8"
					}, {
						"Technical_Skill": "ABAP",
						"Value": "10"
					}, {
						"Technical_Skill": "ABAP ON HANA",
						"Value": "6"
					}, {
						"Technical_Skill": "CDS",
						"Value": "6"
					}, {
						"Technical_Skill": "FIORI/UI5",
						"Value": "5"
					}, {
						"Technical_Skill": "RAP",
						"Value": "4"
					}

				]

			});

			this.getView().setModel(oModel1);

			this.getChatBot();

		},

		getChatBot: function () {
			if (!document.getElementById("chatbot")) {

				var newChatbot = document.createElement("script");
				newChatbot.setAttribute("id", "chatbot");
				newChatbot.setAttribute("src", "https://cdn.cai.tools.sap/webchat/webchat.js");
				document.body.appendChild(newChatbot);
				newChatbot.setAttribute("token", "bb2f787a4c4b76201b96ba67a0c942ba");
				newChatbot.setAttribute("channelId", "1f87aa67-0be8-404e-822c-ac4d2cd64a4d");

			}

		},

		onFilter: function (oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			this.fnApplyFiltersAndOrdering();
		},

		_fnGroup: function (oContext) {
			var sShipperName = oContext.getProperty("ShipperName");

			return {
				key: sShipperName,
				text: sShipperName
			};
		},

		onReset: function (oEvent) {
			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.byId("ShipperName").setValue("");

			this.fnApplyFiltersAndOrdering();
		},
		onSort: function (oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrdering();
		},

		onNewFilter: function (oEvent) {
			this.sSearchQuery = this.getView().getModel().getProperty("/recipient/name");
			this.fnApplyFiltersAndOrdering();
		},

		onGroup: function (oEvent) {
			this.bGrouped = !this.bGrouped;
			this.fnApplyFiltersAndOrdering();
		},

		fnApplyFiltersAndOrdering: function (oEvent) {
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("ShipperName", this.bDescending, this._fnGroup));
			} else {

				aSorters.push(new Sorter("ProductName", this.bDescending));
			}

			if (this.sSearchQuery) {
				var oFilter = new Filter("ShipperName", FilterOperator.Contains, this.sSearchQuery);
				aFilters.push(oFilter);
			}

			// this.byId("table1").getBinding("items").filter(aFilters).sort(aSorters);
		},

		onPress: function (oEvent) {
			var spath = oEvent.getSource().getBindingContext("invoice").getPath();
			var selectedPath = JSON.stringify(oEvent.getSource().getBindingContext("invoice").getProperty(spath));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				"invoicePath": selectedPath
			});
		}

	});
});