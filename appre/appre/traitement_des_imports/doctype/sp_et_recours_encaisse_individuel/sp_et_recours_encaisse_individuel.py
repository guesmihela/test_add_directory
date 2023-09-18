# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt


import frappe
from frappe.model.document import Document

class SPetRecoursencaisseindividuel(Document):
	pass
@frappe.whitelist()
def sinistre_indiv():

	sinistre_list = frappe.get_list("SP et Recours encaisse individuel",
									 filters={"traiter": False}, fields=["*"])


	for sinistre in sinistre_list:
		doc = frappe.new_doc('Recap SP et Recours encaisse')
		doc.name = sinistre.name
		doc.periode_comptable = sinistre.periode_comptable
		doc.date_de_traitement = sinistre.date_preparation_du_fichier
		doc.type_contrat = "Contrat Individuel"
		doc.numero_du_contrat = sinistre.numero_du_contrat
		doc.numero_de_sinistre = sinistre.numero_de_sinistre
		doc.numero_operation = sinistre.numero_operation
		doc.code_produit = sinistre.code_produit
		doc.code_garantie = sinistre.code_garantie
		doc.recours_encaisse = sinistre.recours_encaisse
		doc.date_de_sinistre = sinistre.date_de_sinistre
		doc.date_de_reglement = sinistre.date_de_reglement
		doc.montant_de_reglement = sinistre.montant_de_reglement


		doc.insert()

		contrat_list = frappe.get_list("Contrat Individuel",
										filters={"numero_du_contrat": sinistre.numero_du_contrat}, fields=["*"])

		for contrat in contrat_list:

			frappe.db.set_value('Recap SP et Recours encaisse', sinistre.name, {
				'code_client': contrat.code_client,
				'nom_du_client': contrat.nom_du_client,
				'compagnie_aperitrice': contrat.compagnie_aperitrice ,
				'quote_part_coassurance': contrat.quote_part_en_coassurance,
			     'capitaux_a_100': contrat.capitaux_assures_a_100,
				'quote_part_coassurance_calculer': contrat.quote_part_coassurance_calculer

			})



		exist_reassurance = frappe.db.exists({"doctype": "Import des Donnees Reassurance", "numero_du_contrat":  sinistre.numero_du_contrat})

		if exist_reassurance:
		 reassurance_list = frappe.get_list("Donnees Reassurance",
										filters={"numero_du_contrat": sinistre.numero_du_contrat}, fields=["*"])
		 for rea in reassurance_list:

				frappe.db.set_value('Donnees Reassurance', sinistre.name, {
					'nature_du_risque': rea.nature_du_risque,
					'base_engagement': rea.base_engagement,
					'taux_smp': rea.taux_smp,
					'capital_reassurance': rea.capital_base_reassurance})


		exist_event = frappe.db.exists(
			{"doctype": "Evenement", "numero_de_sinistre": sinistre.numero_de_sinistre})

		if exist_event:
			event_list = frappe.get_list("Evenement",
											   filters={"numero_de_sinistre": sinistre.numero_de_sinistre}, fields=["*"])
			for eve in event_list:
				frappe.db.set_value('Recap SP et Recours encaisse', sinistre.name, {
					'numero_evenement': eve.numero_evenement
					})

		kbr = calcul_kbr(sinistre, exist_reassurance)
		frappe.db.set_value('Recap SP et Recours encaisse', sinistre.name, {'kbr': kbr})
		frappe.db.set_value('SP et Recours encaisse individuel', sinistre.name, {'traiter': 1 })

def calcul_kbr(sinistre, exist):
	capital_reassurance, quote_part_coassurance, capitaux_a_100, quote_part_coassurance_calculer = frappe.db.get_value('Recap SP et Recours encaisse',
					sinistre.name, ['capital_reassurance', 'quote_part_coassurance', 'capitaux_a_100', 'quote_part_coassurance_calculer'])
	if exist :
		kbr = capital_reassurance
	else:
		if quote_part_coassurance == "":
			kbr = capitaux_a_100
		else:
			   if quote_part_coassurance_calculer =="Oui":
				   kbr = capitaux_a_100
			   else:
				   kbr = capitaux_a_100 * quote_part_coassurance / 100
	return  kbr