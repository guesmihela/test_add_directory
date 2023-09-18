
frappe.ui.form.on("Periodicite des comptes de reassurance facultative", "constitutions_risques_en_cours", function(frm) {
  if(frm.doc.constitutions_risques_en_cours == "fin de chaque période")
  {

    set_field_options("liberations_risques_en_cours", ["fin de la période suivante" ])
  }
  else if(frm.doc.constitutions_risques_en_cours == "Fin de l'année")
  {
    set_field_options("liberations_risques_en_cours", ["fin de l'année suivante", "fin de la période suivante"])


  }

  });
  frappe.ui.form.on("Periodicite des comptes de reassurance facultative", "constitutions_sinistres_payer", function(frm) {
  if(frm.doc.constitutions_sinistres_payer == "fin de chaque période")
  {

    set_field_options("liberations_sinistres_payer", ["fin de la période suivante" ])
  }
  else if(frm.doc.constitutions_sinistres_payer == "Fin de l'année")
  {
    set_field_options("liberations_sinistres_payer", ["fin de l'année suivante", "fin de la période suivante"])


  }

  });

  frappe.ui.form.on("Periodicite des comptes de reassurance facultative", "constitutions_recours_encaisser", function(frm) {
  if(frm.doc.constitutions_recours_encaisser == "fin de chaque période")
  {

    set_field_options("liberation_recours_encaisser", ["fin de la période suivante" ])
  }
  else if(frm.doc.constitutions_recours_encaisser == "Fin de l'année")
  {
    set_field_options("liberation_recours_encaisser", ["fin de l'année suivante", "fin de la période suivante"])


  }

  });
  frappe.ui.form.on("Periodicite des comptes de reassurance facultative", "constitutions_sinistres_inconnus", function(frm) {
  if(frm.doc.constitutions_sinistres_inconnus == "fin de chaque période")
  {

    set_field_options("liberation_sinistres_inconnus", ["fin de la période suivante" ])
  }
  else if(frm.doc.constitutions_sinistres_inconnus == "Fin de l'année")
  {
    set_field_options("liberation_sinistres_inconnus", ["fin de l'année suivante", "fin de la période suivante"])


  }

  });