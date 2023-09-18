# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SAPetRecoursaencaissercadre(Document):
	pass
@frappe.whitelist()
def sinistre_indiv():

	sinistre_list = frappe.get_list("SAP et Recours a encaisser cadre",
									 filters={"traiter": False}, fields=["*"])


	for sinistre in sinistre_list:
		doc = frappe.new_doc('Recap SAP et Recours a encaisser')
		doc.name = sinistre.name
		doc.periode_comptable = sinistre.periode_comptable
		doc.date_preparation_du_fichier = sinistre.date_preparation_du_fichier
		doc.type_contrat = "Contrat cadre"
		doc.numero_aliment = sinistre.numero_aliment
		doc.numero_du_contrat = sinistre.numero_du_contrat
		doc.numero_de_sinistre = sinistre.numero_de_sinistre
		doc.nature_de_sinistre = sinistre.nature_de_sinistre
		doc.date_ouverture_sinistre = sinistre.date_ouverture_sinistre
		doc.code_produit = sinistre.code_produit
		doc.code_agence = sinistre.code_agence
		doc.heure_de_sinistre = sinistre.heure_de_sinistre
		doc.date_de_sinistre = sinistre.date_de_sinistre
		doc.lieu_de_sinistre_adresse = sinistre.lieu_de_sinistre_adresse
		doc.etat_de_sinistre = sinistre.etat_de_sinistre
		doc.montant_de_recours_a_encaisser = sinistre.montant_de_recours_a_encaisser

		doc.insert()

		contrat_list = frappe.get_list("Contrat cadre",
										filters={"numero_du_contrat_cadre": sinistre.numero_du_contrat}, fields=["*"])

		for contrat in contrat_list:

			frappe.db.set_value('Recap SAP et Recours a encaisser', sinistre.name, {
				'code_client': contrat.code_client,
				'nom_du_client': contrat.nom_du_client
			})
		aliment_list = frappe.get_list("Aliment",
									   filters={"numero_aliment": sinistre.numero_aliment}, fields=["*"])

		for aliment in aliment_list:
			frappe.db.set_value('Recap SAP et Recours a encaisser', sinistre.name, {
				'compagnie_aperitrice': aliment.compagnie_aperitrice,
				'quote_part_coassurance': aliment.quote_part_en_coassurance,
				'capitaux_a_100': aliment.capitaux_assures_a_100

			})

		exist_reassurance = frappe.db.exists({"doctype": "Donnees Reassurance", "numero_du_contrat":  sinistre.numero_du_contrat})

		if exist_reassurance:
		 reassurance_list = frappe.get_list("Donnees Reassurance",
										filters={"numero_du_contrat": sinistre.numero_du_contrat}, fields=["*"])
		 for rea in reassurance_list:

				frappe.db.set_value('Recap SAP et Recours a encaisser', sinistre.name, {
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
				frappe.db.set_value('Recap SAP et Recours a encaisser', sinistre.name, {
					'numero_evenement': eve.numero_evenement
					})



		frappe.db.set_value('SAP et Recours a encaisser cadre', sinistre.name, {'traiter': 1 })

