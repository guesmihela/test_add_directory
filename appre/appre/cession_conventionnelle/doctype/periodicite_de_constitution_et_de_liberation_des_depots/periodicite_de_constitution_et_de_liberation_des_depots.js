// Copyright (c) 2023, tnt and contributors
// For license information, please see license.txt

//risque en cours
frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitution_compte_risque_en_cours", function(frm) {
  if(frm.doc.constitution_compte_risque_en_cours == "Fin de chaque période")
  {
       set_field_options("constitutions_hors_compte_risque_encours", ["Fin de chaque période","Les périodes autres que fin d'année","Non appliqué" ])

    set_field_options("liberations_compte_risque_en_cours", ["Fin de la période suivante","Fin de l'année","Fin de la même période de l'année suivante"])
  }
  else if(frm.doc.constitution_compte_risque_en_cours == "Fin de l'année")
  {
    set_field_options("liberations_compte_risque_en_cours", ["Fin de l'année suivante"])
     set_field_options("constitutions_hors_compte_risque_encours", ["Les périodes autres que fin d'année","Non appliqué" ])

	  	     frm.set_value('liberations_compte_risque_en_cours', "Fin de l'année suivante")

  }
  else if(frm.doc.constitution_compte_risque_en_cours == "Non appliqué")
  {
       set_field_options("constitutions_hors_compte_risque_encours", ["Fin de chaque période", "Non appliqué"])


  }
  });
  frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitutions_hors_compte_risque_encours", function(frm) {
  if(frm.doc.constitutions_hors_compte_risque_encours == "Fin de chaque période")
  {
  	  	     frm.set_value('constitution_compte_risque_en_cours', "Non appliqué")

}
  });
//sinistre a payer

frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitutions_en_compte_sinistres_payer", function(frm) {
  if(frm.doc.constitutions_en_compte_sinistres_payer == "Fin de chaque période")
  {
       set_field_options("constitution_hors_compte_sinistre_payer", ["Fin de chaque période","Les périodes autres que fin d'année","Non appliqué" ])

    set_field_options("liberations_compte_sinistres_payer", ["Fin de la période suivante","Fin de l'année","Fin de la même période de l'année suivante"])
  }
  else if(frm.doc.constitutions_en_compte_sinistres_payer == "Fin de l'année")
  {
    set_field_options("liberations_compte_sinistres_payer", ["Fin de l'année suivante"])
     set_field_options("constitution_hors_compte_sinistre_payer", ["Les périodes autres que fin d'année","Non appliqué" ])

	  	     frm.set_value('liberations_compte_sinistres_payer', "Fin de l'année suivante")

  }
  else if(frm.doc.constitutions_en_compte_sinistres_payer == "Non appliqué")
  {
       set_field_options("constitution_hors_compte_sinistre_payer", ["Fin de chaque période", "Non appliqué"])

  }
  });
  frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitution_hors_compte_sinistre_payer", function(frm) {
  if(frm.doc.constitution_hors_compte_sinistre_payer == "Fin de chaque période")
  {
  	  	     frm.set_value('constitutions_en_compte_sinistres_payer', "Non appliqué")

}
  });

// Dépôts pour recours à encaisser

frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitution_en_compte_recours", function(frm) {
  if(frm.doc.constitution_en_compte_recours == "Fin de chaque période")
  {
       set_field_options("constitution_hors_compte_recours", ["Fin de chaque période","Les périodes autres que fin d'année","Non appliqué" ])

    set_field_options("liberation_en_cours_recours", ["Fin de la période suivante","Fin de l'année","Fin de la même période de l'année suivante"])
  }
  else if(frm.doc.constitution_en_compte_recours == "Fin de l'année")
  {
    set_field_options("liberation_en_cours_recours", ["Fin de l'année suivante"])
     set_field_options("constitution_hors_compte_recours", ["Les périodes autres que fin d'année","Non appliqué" ])

	  	     frm.set_value('liberation_en_cours_recours', "Fin de l'année suivante")

  }
  else if(frm.doc.constitution_en_compte_recours == "Non appliqué")
  {
       set_field_options("constitution_hors_compte_recours", ["Fin de chaque période", "Non appliqué"])


  }
  });
  frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitution_hors_compte_recours", function(frm) {
  if(frm.doc.constitution_hors_compte_recours == "Fin de chaque période")
  {
  	  	     frm.set_value('constitution_en_compte_recours', "Non appliqué")

}
  });

// Dépôts pour recours à encaisser

frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitution_en_compte_sinistre_inconnu", function(frm) {
  if(frm.doc.constitution_en_compte_sinistre_inconnu == "Fin de chaque période")
  {
       set_field_options("constitution_hors_compte_sinistre_inconnu", ["Fin de chaque période","Les périodes autres que fin d'année","Non appliqué" ])

    set_field_options("libiration_en_compte_sinistre_inconnu", ["Fin de la période suivante","Fin de l'année","Fin de la même période de l'année suivante"])
  }
  else if(frm.doc.constitution_en_compte_sinistre_inconnu == "Fin de l'année")
  {
    set_field_options("libiration_en_compte_sinistre_inconnu", ["Fin de l'année suivante"])
     set_field_options("constitution_hors_compte_sinistre_inconnu", ["Les périodes autres que fin d'année","Non appliqué" ])

	  	     frm.set_value('libiration_en_compte_sinistre_inconnu', "Fin de l'année suivante")

  }
  else if(frm.doc.constitution_en_compte_sinistre_inconnu == "Non appliqué")
  {
       set_field_options("constitution_hors_compte_sinistre_inconnu", ["Fin de chaque période", "Non appliqué"])


  }
  });
  frappe.ui.form.on("periodicite de constitution et de liberation des depots", "constitution_hors_compte_sinistre_inconnu", function(frm) {
  if(frm.doc.constitution_hors_compte_sinistre_inconnu == "Fin de chaque période")
  {
  	  	     frm.set_value('constitution_en_compte_sinistre_inconnu', "Non appliqué")

}
  });