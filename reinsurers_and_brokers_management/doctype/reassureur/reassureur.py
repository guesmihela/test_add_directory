# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt
import datetime
from datetime import datetime
from frappe.utils import today

import frappe
from frappe.model.document import Document
from frappe import _, throw
class Reassureur(Document):

	def validate(self):



		if self.donnees_fiscales:
			for grandchild_doc in self.donnees_fiscales:
				date_effet = grandchild_doc.date_effet
				n = 0
				date_object = datetime.strptime(date_effet, '%Y-%m-%d').date()
				date_n = datetime.strptime(today(), '%Y-%m-%d').date()

				year = date_object.year
				y_n = date_n.year
				if year <= 2010:
					frappe.throw(_("L’année de la date d'effet d'application de la taxe doit être strictement supérieure à 2010"))
				if year > y_n +1:
					frappe.throw(_("L’année de la date d'effet d'application de la taxe doit être inférieure ou égale à  {}".format(str(y_n + 1))))
				for child_doc in self.donnees_fiscales:
					if date_effet == child_doc.date_effet :
						n = n+1
					#if n > 1 :
					#	frappe.throw(_("La date d’effet d’application de la taxe ne doit pas se répéter "))
@frappe.whitelist()
def get_traite_nbr_per_year(code):
	traites = []
	traite_list = histo_traite(code)
	for trt in traite_list:
		traites.append(trt["traite"])
	# Get a list of traite grouped by year
	results = frappe.get_list(
		doctype="Traite",
		fields=["annee_effet", "COUNT(name) AS traite_count"],
		filters={'name': ('in', traites)},
		group_by="annee_effet",
		order_by="modified DESC"
	)
	data = []
	for result in results:
		data.append({
			"annee": result.annee_effet,
			"Number_traite": result.traite_count
		})
	return data
@frappe.whitelist()
def calcul_part_tiers(section, tiers):
	part_tiers = 0
	#tiers = frappe.get_doc("Tiers", filters={"link_name": section, "le_tiers": tiers})
	tiers = frappe.get_doc({"doctype": "Tiers", "link_name": section, "name": tiers})
	tier = frappe.get_doc("Tiers", tiers.name)
	part = tier.part_signee
	courtier_list = frappe.db.get_list('Tiers', filters={'type_tiers': "Courtier", "link_name": section}, fields=['name'])
	if courtier_list:
		for item in courtier_list:
			reassureur_list = frappe.db.get_all('child reassurer', filters={'parent': item.name}, fields=['name', 'code_reassurer', 'part_de_reassureur'])
			if reassureur_list:
				for reass in reassureur_list:
					if tier.le_tiers == reass.code_reassurer:
						part_tiers = part_tiers + float(reass.part_de_reassureur)
			else:
				part_tiers = 0
			part_tiers = part_tiers + part
	else:
		part_tiers = part_tiers + part
	return part_tiers
@frappe.whitelist()
def calcul_part_tiers_placmt(section, tiers):
	part_tiers = 0
	#tiers = frappe.get_doc("Tiers placement", filters={"link_name": section, "le_tiers": tiers})
	tiers = frappe.get_doc({"doctype": "Tiers placement", "link_name": section, "name": tiers})
	tier = frappe.get_doc("Tiers placement", tiers.name)
	part = tier.part_signee
	courtier_list = frappe.db.get_list('Tiers placement', filters={'type_tiers': "Courtier", "link_name": section}, fields=['name'])
	if courtier_list:
		for item in courtier_list:
			reassureur_list = frappe.db.get_all('Part reassureur derriere  courtiers placement', filters={'parent': item.name}, fields=['name', 'reassureur', 'part_du_reassureur'])
			if reassureur_list:
				for reass in reassureur_list:
					if tier.code_du_tiers == reass.reassureur:
						part_tiers = part_tiers + float(reass.part_du_reassureur)
			else:
				part_tiers = 0
			part_tiers = part_tiers + part
	else:
		part_tiers = part_tiers + part
	return part_tiers
@frappe.whitelist()
def histo_traite(code):
	items_traite = []
	# Tiers_list = frappe.db.get_list('Tiers', filters={'le_tiers': self.reinsurer_code}, pluck='link_name')
	Tiers_list = frappe.db.get_list('Tiers', filters={'le_tiers': code}, fields=['name', 'link_name', 'le_tiers'])
	for item in Tiers_list:
		section = frappe.get_doc("Section", item.link_name)
		section_name = section.name
		traite_name = section.link_name
		traite = frappe.get_doc("Traite", traite_name)
		forme = traite.nom_forme_traite
		branche = traite.code_branche_traite
		anne_effet = traite.annee_effet
		etat_traite = traite.etat_traite
		part_tiers = calcul_part_tiers(section_name, item.name)
		historique_traite = {
			"traite": traite_name,
			"section": section_name,
			"branche": branche,
			"forme": forme,
			"annee_effet": anne_effet,
			"etat_traite": etat_traite,
			"part_tiers": part_tiers
		}
		items_traite.append(historique_traite)
	return items_traite
@frappe.whitelist()
def histo_plcmnt(code):
	items_placmnt = []
	Tiers_list = frappe.db.get_list('Tiers placement', filters={'code_du_tiers': code}, fields=['name', 'link_name', 'code_du_tiers'])
	for item in Tiers_list:
		section = frappe.get_doc("Section Placement", item.link_name)
		section_name = section.name
		placement_name = section.link_name
		placement = frappe.get_doc("Placement en reassurance facultative", placement_name)
		type = section.type_placement
		branche = section.code_branche
		to_format = "dd/mm/yyyy"
		# Format the date
		formatted_date_expiration = frappe.utils.data.format_date(placement.date_expiration, to_format)
		formatted_date_effet = frappe.utils.data.format_date(placement.date_effet, to_format)
		#etat_placement = placement.etat_du_traite
		part_tiers = calcul_part_tiers_placmt(section_name, item.name)
		historique_placement = {
			"cession_fac": placement_name,
			"section": section_name,
			"branche": branche,
			"type": type,
			"periode_effet": f"du  {formatted_date_effet}  au  {formatted_date_expiration}",
			"etat": "",
			"part_tiers": part_tiers
		}
		items_placmnt.append(historique_placement)
	return items_placmnt