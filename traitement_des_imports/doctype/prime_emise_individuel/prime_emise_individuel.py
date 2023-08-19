# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class primeemiseindividuel(Document):
	pass


@frappe.whitelist()
def primes_emises_indiv():
	emission_list = frappe.get_list("prime emise individuel",
									 filters={"traiter": False}, fields=["*"])


	for emission in emission_list:
		doc = frappe.new_doc('Recap emission')
		doc.name = emission.name
		doc.periode_comptable = emission.periode_comptable
		doc.numero_emission = emission.numero_emission
		doc.date_de_traitement = emission.date_preparation_du_fichier
		doc.type_contrat = 'Contrat Individuel'
		doc.numero_du_contrat = emission.numero_du_contrat
		doc.numero_aliment = emission.numero_aliment
		doc.code_agence = emission.code_agence
		doc.nature_emission = emission.nature_emission
		doc.nature_operation = emission.nature_operation
		doc.date_de_souscription_operation = emission.date_de_souscription_operation
		doc.date_effet = emission.dat_effet_operation
		doc.prime_nette = emission.prime_nette_emise
		doc.frais_de_quittance = emission.frais_de_quittance
		doc.commissions_servies = emission.commissions_servies

		doc.insert()


		contrat_list = frappe.get_list("Contrat Individuel",
										filters={"numero_du_contrat": emission.numero_du_contrat}, fields=["*"])

		for contrat in contrat_list:
			frappe.db.set_value('Recap emission', emission.name, {
				'code_client': contrat.code_client,
				'nom_du_client': contrat.nom_du_client,
				'date_echeance_contractuelle': contrat.date_echeance_contractuelle,
				'fractionnement': contrat.fractionnement,
				'compagnie_aperitrice': contrat.compagnie_apéritrice ,
				'quote_part_coassurance': contrat.quote_part_en_coassurance,
			     'capitaux_a_100': contrat.capitaux_assures_a_100,
			      'quote_part_coassurance_calculer': contrat.quote_part_coassurance_calculer

			})


		exist_reassurance = frappe.db.exists({"doctype": "Donnees Reassurance", "numero_du_contrat":  emission.numero_du_contrat})

		if exist_reassurance:
		 reassurance_list = frappe.get_list("Donnees Reassurance",
										filters={"numero_du_contrat": emission.numero_du_contrat}, fields=["*"])
		 for rea in reassurance_list:
				frappe.db.set_value('Recap emission', emission.name, {
					'nature_du_risque': rea.nature_du_risque,
					'base_engagement': rea.base_engagement,
					'taux_smp': rea.taux_smp,
					'capital_reassurance': rea.capital_base_reassurance})

		kbr = calcul_kbr(emission, exist_reassurance)
		frappe.db.set_value('Recap emission', emission.name, {'kbr': kbr })

		frappe.db.set_value('prime emise individuel', emission.name, {'traiter': 1 })



def calcul_kbr(emission, exist):
	capital_reassurance, quote_part_coassurance, capitaux_a_100, quote_part_coassurance_calculer = frappe.db.get_value('Recap emission',
					emission.name, ['capital_reassurance', 'quote_part_coassurance', 'capitaux_a_100', 'quote_part_coassurance_calculer'])
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
