# Copyright (c) 2023, tnt and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class PBechlonnee(Document):
	def before_save(self):
		annee_effet = self.annee_effet
		P_compte = self.premier_compte_pb
		if P_compte == "Fin de la 1ère anné":
			anne_liquidation = int(annee_effet)
			annees = [anne_liquidation]
		if P_compte == "Fin de la 2ème année":
			anne_liquidation = int(annee_effet) + 1
			annees = [int(annee_effet), anne_liquidation]
		if P_compte == "Fin de la 3ème année":
			anne_liquidation = int(annee_effet) + 2
			annees = [int(annee_effet), int(annee_effet) + 1, anne_liquidation]
