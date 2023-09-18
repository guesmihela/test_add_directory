// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Categorie ou produit", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on("Categorie ou produit", "onload", function(frm) {

        frm.set_query("under_insurance_branch", function() {

        return {
            "filters": {
                                "code_branch": frm.doc.branche,

            }

        }
    });


});