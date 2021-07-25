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
			var managername = oEvent.getParameter("arguments").managername;
			var hivename = oEvent.getParameter("arguments").hivename;
			// var selectedRecord = JSON.parse(selectedArguments.invoicePath);

			// var obj = {
			// 	"invoicePath":
			// 	{ managername : managername,
			// 	  hivename : hivename	
			// 	}
			// };

			// set data model on view
			// var oData = {
			// 	recipient: {
			// 		name: "Test"
			// 	}
			// };
			// var oModel = new JSONModel(oData);
			// this.getView().setModel(oModel);			

			// var navigationobjModel = new JSONModel();
			// navigationobjModel.setData(obj);
			// this.getView().setModel(navigationobjModel);

			// test	-->		

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZHIVEMINDS_SRV");
			sap.ui.getCore().setModel(oModel, "myModel");

			var myModel = sap.ui.getCore().getModel("myModel");
			myModel.setHeaders({
				"X-Requested-With": "X"
			});

			var oFilters = [];
			var ProgID = new sap.ui.model.Filter("MANAGERNAME", sap.ui.model.FilterOperator.EQ, managername);
			oFilters.push(ProgID);
			var ProgID = new sap.ui.model.Filter("HIVENAME", sap.ui.model.FilterOperator.EQ, hivename);
			oFilters.push(ProgID);

			var readurl = "/HIVEDETAILSSet";
			var that = this;
			myModel.read(readurl, {
				filters: oFilters,
				success: function (oData, oResponse) {
					// debugger;
					var oModel1 = new sap.ui.model.json.JSONModel({
						"invoicePath": oData.results[0]
					});
					// var tab = that.getView().byId("userdatatable");
					// tab.setModel(userdata);
					that.getView().setModel(oModel1);

					if (oData.results[0].EMPLOYEE1NAME !== "") {
						that.getView().byId("blockcell1").setVisible(true);
						var string = oData.results[0].EMPLOYEE1NAME;
					}
					if (oData.results[0].EMPLOYEE2NAME !== "") {
						that.getView().byId("blockcell2").setVisible(true);
						// string.concat(",", oData.results[0].EMPLOYEE2NAME);
						string = string + " ," + oData.results[0].EMPLOYEE2NAME;
					}
					if (oData.results[0].EMPLOYEE3NAME !== "") {
						that.getView().byId("blockcell3").setVisible(true);
						string = string + " ," + oData.results[0].EMPLOYEE3NAME;
					}
					if (oData.results[0].EMPLOYEE4NAME !== "") {
						that.getView().byId("blockcell4").setVisible(true);
						string = string + " ," + oData.results[0].EMPLOYEE4NAME;
					}
					if (oData.results[0].EMPLOYEE5NAME !== "") {
						that.getView().byId("blockcell5").setVisible(true);
						string = string + " ," + oData.results[0].EMPLOYEE5NAME;
					}
					
					string = "Team Members: " + string;
					
					that.getView().byId("textid").setText(string);

				},
				error: function (err) {
					// debugger;
				}
			});

			// test <--

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
			this.getView().byId("blockcell1").setVisible(false);
			this.getView().byId("blockcell2").setVisible(false);
			this.getView().byId("blockcell3").setVisible(false);
			this.getView().byId("blockcell4").setVisible(false);
			this.getView().byId("blockcell5").setVisible(false);
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
