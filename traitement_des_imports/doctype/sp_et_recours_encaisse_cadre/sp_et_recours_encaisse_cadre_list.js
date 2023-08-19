frappe.listview_settings['SP et Recours encaisse cadre'] = {
	onload: function(listview) {
		listview.page.add_menu_item(__("Import"), function() {
		//listview.call_for_selected_items(method, {"status": "Open"});
          //   frappe.set_route('List', 'Data Import')
              	frappe.set_route("List", "Data Import", {"reference_doctype": 'SP et Recours encaisse cadre'});

		});


			listview.page.add_menu_item(__("Valider import"), function() {
						frappe.call({
    method: "appre.traitement_des_imports.doctype.sp_et_recours_encaisse_cadre.sp_et_recours_encaisse_cadre.sinistre_cadre",

    callback: function(r) {
         	frappe.set_route("List", "Recap SP et Recours encaisse")

      //  frappe.msgprint(r.message)
    }

});


		});


}
}