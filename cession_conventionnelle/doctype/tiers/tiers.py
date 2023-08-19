# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class Tiers(Document):
	def onload(self):
		reassureur_list = frappe.get_list("Reassureur", fields=["*"])
		for re in reassureur_list:
			count = frappe.db.count('Tiers', {'le_tiers': re.name})
			placement = str(count) + " placements"
			frappe.db.set_value('Reassureur', re.name, 'placement', placement)
		courtier_list = frappe.get_list("Courtier", fields=["*"])
		for cour in courtier_list:
			count_cour = frappe.db.count('Tiers', {'le_tiers': cour.name})
			placement = str(count_cour) + " placements"
			frappe.db.set_value('Courtier', cour.name, 'placement', placement)

	def before_save(self):
		code_tiers = self.name
		pb_ou_pp = self.pb_ou_pp
		section = self.link_name
		reassureur = self.le_tiers
		affectation_comptable = self.affectation_comptable
		if self.type_de_la_commission =="Commission à échelle":
			echelle_commission = self.echelle_de_commission
			if frappe.db.exists("Section commission", {"parent": ['!=', echelle_commission], "code_tiers": code_tiers}):
				frappe.db.delete("Section commission", {"parent": ['!=', echelle_commission], "code_tiers": code_tiers})
			if not frappe.db.exists("Section commission", {"parenttype": "Echelle de commission", "parent": echelle_commission,
														 "code_tiers": code_tiers}):
				nb_row = frappe.db.count('Section commission', {'parenttype': "Echelle de commission", "parent": echelle_commission})
				nb_row = nb_row + 1
				traite = frappe.db.get_value('Section', section, 'link_name')
				doc = frappe.new_doc('Section commission')
				doc.affectation_comptable = affectation_comptable
				doc.parenttype = "Echelle de commission"
				doc.traite = traite
				doc.parent = echelle_commission
				doc.section = section
				doc.code_tiers = code_tiers
				doc.reassureur = reassureur
				doc.idx = nb_row
				doc.parentfield = "sections"
				doc.insert()
		if (pb_ou_pp == "P.B" or pb_ou_pp == "P.P"):
			if pb_ou_pp == "P.B":
				nature_pb = self.nature_de_la_pb
				if nature_pb == "P.B Echelonnée":
					parenttype ="PB echlonnee"
					parent = self.taux_echelonnee
				if nature_pb == "P.B Fixe":
					parenttype = "PB fixe"
					parent = self.taux_de_la_pb
			if pb_ou_pp == "P.P":
				nature_pp = self.nature_de_la_pp
				if nature_pp == "P.P Fixe":
					parenttype = "PP fixe"
					parent = self.pp_fixe
				if nature_pp == "P.P Échelonnée":
					parenttype = "PP echlonnee"
					parent = self.pp_echelonnee
			insert_pb_pp(affectation_comptable, parenttype, parent, code_tiers, section, reassureur)

def insert_pb_pp(affectation_comptable , parenttype , parent, code_tiers , section , reassureur)  :
	if affectation_comptable:
		if frappe.db.exists("section pb et pp", {"parenttype": parenttype, "parent": parent,
												 "code_tiers": ['!=', code_tiers], "affectation_comptable": '1'}):
			frappe.throw(title='Error', msg=('{0}  est déja affecté a une autre section').format(parent))
		if frappe.db.exists("section pb et pp", {"parenttype": parenttype, "parent": parent,"code_tiers":code_tiers, "affectation_comptable": '0'}):
			pb_pp_list = frappe.get_list("section pb et pp", filters={"parenttype": parenttype, "parent": parent ,"code_tiers":code_tiers},fields=["*"])
			for pb_pp in pb_pp_list:
				frappe.db.set_value('section pb et pp', pb_pp.name, 'affectation_comptable', '1')

	if frappe.db.exists("section pb et pp", { "parent": ['!=', parent],"code_tiers": code_tiers}):
			frappe.db.delete("section pb et pp", { "parent": ['!=', parent], "code_tiers": code_tiers})
	if not frappe.db.exists("section pb et pp", {"parenttype": parenttype, "parent": parent,
													 "code_tiers": code_tiers}):
			nb_row = frappe.db.count('section pb et pp', {'parenttype':parenttype, "parent": parent})
			nb_row = nb_row + 1
			traite = frappe.db.get_value('Section', section, 'link_name')
			doc = frappe.new_doc('section pb et pp')
			doc.affectation_comptable = affectation_comptable
			doc.parenttype = parenttype
			doc.traite = traite
			doc.parent = parent
			doc.section = section
			doc.code_tiers = code_tiers
			doc.reassureur = reassureur
			doc.idx = nb_row
			doc.parentfield = "sections"
			doc.insert()

