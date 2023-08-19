import frappe
from datetime import datetime
import datetime

from frappe.model.document import Document
from frappe import _
import json

@frappe.whitelist()
def renouveller(docname ):
        now = datetime.datetime.now()

        traite_list = frappe.get_all("Traite", filters={"name": docname},
                                               fields=["*"])
        for traite in traite_list:
                anne_effet = int(traite.annee_effet)
                anne_effet = anne_effet + 1
                identifiant_legal = traite.forme_traite + "-"  + str(anne_effet) + "-" + traite.code_branche_traite

                name_t = traite.nom_traite + "-" + str(anne_effet)
                doc = frappe.new_doc('Traite')
                doc.origin_traite =traite.name
                doc.nom_traite = traite.nom_traite
                doc.type_traite = traite.type_traite
                doc.forme_traite = traite.forme_traite
                doc.nom_forme_traite = traite.nom_forme_traite
                doc.annee_effet = str(anne_effet)
                doc.code_branche_traite =traite.code_branche_traite
                doc.identifiant_legal = identifiant_legal
                doc.description_traite =traite.description_traite
                doc.date_effet = now
                doc.duree_validite=  traite.duree_validite
                doc.preavis_resiliation = traite.preavis_resiliation
                doc.etat_traite = "Brouillon"
                doc.date_etat= now
                doc.type_tiers = traite.type_tiers
                doc.tiers_aperiteur= traite.tiers_aperiteur
                doc.periodicite_comptes = traite.periodicite_comptes
                doc.delai_envoi_comptes =traite.delai_envoi_comptes
                doc.delai_bien_trouve = traite.delai_bien_trouve
                doc.delai_reglement = traite.delai_reglement
                doc.type_comptabilisation = traite.type_comptabilisation
                doc.estimation_prime_a_ceeder =traite.estimation_prime_a_ceeder
                doc.assiette_primes =traite.assiette_primes
                doc.base_engagement = traite.base_engagement
                doc.base_cession = traite.base_cession
                doc.taux_smp_min = traite.taux_smp_min
                doc.choix_coassurance =traite.choix_coassurance
                doc.limite_en_coassurance =traite.limite_en_coassurance
                doc.cat_nat = traite.cat_nat
                doc.limite_cat_nat_par_annee_assurance =traite.limite_cat_nat_par_annee_assurance
                doc.limite_cat_nat_choix =traite.limite_cat_nat_choix
                doc.limite_par_sinistre = traite.limite_par_sinistre
                doc.limite_par_evenement =traite.limite_par_evenement
                doc.r_politique  =traite.r_politique
                doc.limite_r_p_par_s =traite.limite_r_p_par_s
                doc.limite_par_sinistre_r_p =traite.limite_par_sinistre_r_p
                doc.limite_par_evenement_r_p = traite.limite_par_evenement_r_p
                doc.limite_r_p_par_annee =traite.limite_r_p_par_annee
                doc.choix =traite.choix
                doc.limite_priorite =traite.limite_priorite
                doc.taux_priorite =traite.taux_priorite
                doc.choix_franchise_additionnelle= traite.choix_franchise_additionnelle
                doc.franchise_annuelle = traite.franchise_annuelle
                doc.choix_portee = traite.choix_portee
                doc.limite_porte = traite.limite_portee
                doc.taux_porte =traite.taux_portee
                doc.limite_plafond =traite.limite_plafond
                doc.taux_plafond = traite.taux_plafond
                doc.plafond_annuel =traite.plafond_annuel
                doc.clause_indexation  =traite.clause_indexation
                doc.date_deffet_indexation =traite.date_deffet_indexation
                doc.taux_dindexation =traite.taux_dindexation
                doc.cond_app_indexation = traite.cond_app_indexation
                doc.taux_dinflation_clause_index =traite.taux_dinflation_clause_index
                doc.clause_de_stabilisation =traite.clause_de_stabilisation
                doc.annee_base = traite.annee_base
                doc.indice_base = traite.indice_base
                doc.date_deffet_app_clause_de_stabilisation = traite.date_deffet_app_clause_de_stabilisation
                doc.valeur_lindice =traite.valeur_lindice
                doc.condition_app_clause_stabilisation =traite.condition_app_clause_stabilisation
                doc.taux_inflation_clause_sta = traite.taux_inflation_clause_sta
                doc.insert()



#####                    ----Section list ---------
                section_list = frappe.get_all("Section", filters={"link_name": traite.name},
                                              fields=["*"])
                for sec in section_list :
                        new_nom_sec = sec.nom_section + "-" + str(anne_effet)

                        doc = frappe.new_doc('Section')
                        doc.etat_doc = sec.etat_doc
                        doc.etat_tiers = sec.etat_tiers
                        doc.code_section = sec.code_section
                        doc.code_risque_section = sec.code_risque_section
                        doc.nom_section = new_nom_sec
                        doc.description_section = sec.description_section
                        doc.link_name = name_t
                        doc.type_traite = sec.type_traite
                        doc.forme_traite =  sec.forme_traite
                        doc.niveau_traite = sec.niveau_traite
                        doc.fonctionnement = sec.fonctionnement
                        doc.engagement_line_slip = sec.engagement_line_slip
                        doc.type_du_plein = sec.type_du_plein
                        doc.valeur_du_plein = sec.valeur_du_plein
                        doc.limite_plein = sec.limite_plein
                        doc.nombre_de_pleins_limite = sec.nombre_de_pleins_limite
                        doc.nombre_de_pleins_retention = sec.nombre_de_pleins_retention
                        doc.limite_retention = sec.limite_retention
                        doc.limite_t_p = sec.limite_t_p
                        doc.taux_retention = sec.taux_retention
                        doc.limite = sec.limite
                        doc.nb_pleins_engagement = sec.nb_pleins_engagement
                        doc.limite_engagement_plein = sec.limite_engagement_plein
                        doc.taux_engagement = sec.taux_engagement
                        doc.limite_engagement = sec.limite_engagement
                        doc.methode_calcul_depots_primes = sec.methode_calcul_depots_primes
                        doc.taux_des_depots_primes = sec.taux_des_depots_primes
                        doc.depots_sap =sec.depots_sap
                        doc.taux_de_depots_sap =sec.taux_de_depots_sap
                        doc.choix_du_mouvement_primes = sec.choix_du_mouvement_primes
                        doc.taux_entree_en_portefeuille_primes =sec.taux_entree_en_portefeuille_primes
                        doc.taux_retrait_de__portefeuille_primes = sec.taux_retrait_de__portefeuille_primes
                        doc.choix_du_mouvement_sinistres =sec.choix_du_mouvement_sinistres
                        doc.taux_entree_en_portefeuille_sinistres = sec.taux_entree_en_portefeuille_sinistres
                        doc.taux_retrait_de__portefeuille_sinistres = sec.taux_retrait_de__portefeuille_sinistres
                        doc.avis_de_sinistre =sec.avis_de_sinistre
                        doc.sinistre_au_comptant = sec.sinistre_au_comptant
                        doc.type_de_primes = sec.type_de_primes
                        doc.type_du_taux= sec.type_du_taux
                        doc.taux_de_primes =sec.taux_de_primes
                        doc.taux_de_chargement = sec.taux_de_chargement
                        doc.taux_min = sec.taux_min
                        doc.taux_max =sec.taux_max
                        doc.montant_de_la_prime =sec.montant_de_la_prime
                        doc.reconstitution =  sec.reconstitution
                        doc.nombre_de__reconstitution =sec.nombre_de__reconstitution
                        doc.link_doctype = sec.link_doctype
                        doc.meme_condition = sec.meme_condition
                        doc.type_de_la_commission =sec.type_de_la_commission
                        doc.taux_commission_provisoire = sec.taux_commission_provisoire
                        doc.taux_de_commission = sec.taux_de_commission
                        doc.taux_de_la_surcommission =sec.taux_de_la_surcommission
                        doc.echelle_de_commission =sec.echelle_de_commission
                        doc.base_de_calcul_des_interets = sec.base_de_calcul_des_interets
                        doc.taux_interets =sec.taux_interets
                        doc.pb_ou_pp =sec.pb_ou_pp
                        doc.nature_de_la_pb =sec.nature_de_la_pb
                        doc.nature_de_la_pp =sec.nature_de_la_pp
                        doc.taux_de_la_pb =sec.taux_de_la_pb
                        doc.taux_echelonnee = sec.taux_echelonnee
                        doc.pp_fixe =sec.pp_fixe
                        doc.pp_echelonnee = sec.pp_echelonnee
                        doc.bonification_pour_non_sinistre = sec.bonification_pour_non_sinistre
                        doc.taux_de_bonification =sec.taux_de_bonification
                        doc.insert()

                        info_line_slip_list = frappe.get_all("info contrat line slip",
                                                             filters={"parenttype": 'Section', 'parent': sec.name},
                                                             fields=["*"])
                        for inf_line in info_line_slip_list:
                                doc = frappe.new_doc('info contrat line slip')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.numero_du_contrat = inf_line.numero_du_contrat
                                doc.assure = inf_line.assure
                                doc.capital_base_reassurance_100 = inf_line.capital_base_reassurance_100
                                doc.fixe = inf_line.fixe
                                doc.engagement_line_slip = inf_line.engagement_line_slip
                                doc.idx = inf_line.idx
                                doc.parentfield = "liste_de_contrats"
                                doc.part_versee = inf_line.part_versee
                                doc.base_engagement = inf_line.base_engagement
                                doc.taux_smp = inf_line.taux_smp
                                doc.insert()

                        produit_list = frappe.get_all("Affectation des Produits et Garanties child",
                                                                   filters={"parenttype": 'Section',
                                                                            'parent': sec.name},
                                                                   fields=["*"])
                        for pro in produit_list:
                                doc = frappe.new_doc('Affectation des Produits et Garanties child')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.affectation_de = pro.affectation_de
                                doc.produitsgaranties = pro.produitsgaranties
                                doc.categorie_produit = pro.categorie_produit
                                doc.produit_garantie = pro.produit_garantie
                                doc.produit = pro.produit
                                doc.idx = pro.idx
                                doc.parentfield = "table_tree"
                                doc.insert()

                        paiement_list = frappe.get_all("Echeancier de Paiement child",
                                                       filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                       fields=["*"])
                        for pai in paiement_list:
                                doc = frappe.new_doc('Echeancier de Paiement child')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.le_taux_de_lecheancier = pai.le_taux_de_lecheancier
                                doc.date_decheancier = pai.date_decheancier

                                doc.idx = pai.idx
                                doc.parentfield = "echéancier_de_paiement"
                                doc.insert()

                        plein_intervalles_list = frappe.get_all("valeur de plein par intervalles",
                                                                filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                                fields=["*"])
                        for p_int in plein_intervalles_list:
                                doc = frappe.new_doc('valeur de plein par intervalles')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.valeur_de_pleins = p_int.valeur_de_pleins
                                doc.nombre_de_pleins = p_int.nombre_de_pleins
                                doc.taux_de_prime = p_int.taux_de_prime
                                doc.idx = p_int.idx
                                doc.parentfield = "plein_variable_par_taux"
                                doc.insert()
                        plein_tranche_list = frappe.get_all("Plein variable par tranche de capitaux",
                                                            filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                            fields=["*"])
                        for p_tran in plein_tranche_list:
                                doc = frappe.new_doc('Plein variable par tranche de capitaux')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.valeur_de_pleins = p_tran.valeur_de_pleins
                                doc.nombre_de_pleins = p_tran.nombre_de_pleins
                                doc.tranches_de_capitaux = p_tran.tranches_de_capitaux
                                doc.idx = p_tran.idx
                                doc.parentfield = "plein_variable_par"
                                doc.insert()
                        retention_taux_list = frappe.get_all("retention valeur de pleins par taux",
                                                             filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                             fields=["*"])
                        for re_taux in retention_taux_list:
                                doc = frappe.new_doc('retention valeur de pleins par taux')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.valeur_de_pleins = re_taux.valeur_de_pleins
                                doc.nombre_de_pleins = re_taux.nombre_de_pleins
                                doc.taux_de_prime = re_taux.taux_de_prime
                                doc.idx = re_taux.idx
                                doc.parentfield = "plein_variable_taux_retention"
                                doc.insert()

                        retention_tranche_list = frappe.get_all("Retention Plein variable par tranche de capitaux",
                                                                filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                                fields=["*"])
                        for re_tran in retention_tranche_list:
                                doc = frappe.new_doc('Retention Plein variable par tranche de capitaux')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.valeur_de_pleins = re_tran.valeur_de_pleins
                                doc.nombre_de_pleins = re_tran.nombre_de_pleins
                                doc.tranches_de_capitaux = re_tran.tranches_de_capitaux
                                doc.idx = re_tran.idx
                                doc.parentfield = "plein_variable_capitaux_retention"
                                doc.insert()
                        engagement_taux_list = frappe.get_all("engagement valeur de pleins par taux",
                                                              filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                              fields=["*"])
                        for eng_taux in engagement_taux_list:
                                doc = frappe.new_doc('engagement valeur de pleins par taux')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.valeur_de_pleins = eng_taux.valeur_de_pleins
                                doc.nombre_de_pleins = eng_taux.nombre_de_pleins
                                doc.taux_de_prime = eng_taux.taux_de_prime
                                doc.idx = eng_taux.idx
                                doc.parentfield = "plein_variable_taux_engagement"
                                doc.insert()
                        engagement_capitaux_list = frappe.get_all("Engagement Plein variable par tranche de capitaux",
                                                                  filters={"parenttype": 'Section',
                                                                'parent': sec.name},
                                                                  fields=["*"])
                        for eng_cap in engagement_capitaux_list:
                                doc = frappe.new_doc('Engagement Plein variable par tranche de capitaux')
                                doc.parenttype = "Section"
                                doc.parent = new_nom_sec
                                doc.valeur_de_pleins = eng_cap.valeur_de_pleins
                                doc.nombre_de_pleins = eng_cap.nombre_de_pleins
                                doc.tranches_de_capitaux = eng_cap.tranches_de_capitaux
                                doc.idx = eng_cap.idx
                                doc.parentfield = "plein_variable_capitaux_engagement"
                                doc.insert()
                        tiers_list = frappe.get_all("Tiers", filters={"link_name": sec.name},
                                                       fields=["*"])
                        for tiers in tiers_list:
                                new_nom_tiers = new_nom_sec + '-' + tiers.type_tiers

                                doc = frappe.new_doc('Tiers')
                                doc.link_name = new_nom_sec
                                doc.type_traite = tiers.type_traite
                                doc.part_de_chaque_tiers = tiers.part_de_chaque_tiers
                                doc.type_tiers =tiers.type_tiers
                                doc.le_tiers = tiers.le_tiers
                                doc.etat_tiers = tiers.etat_tiers
                                doc.part_signee =tiers.part_signee
                                doc.document_signe =tiers.document_signe
                                doc.meme_condition_section =  tiers.meme_condition_section
                                doc.type_de_la_commission = tiers.type_de_la_commission
                                doc.taux_commission_provisoire =tiers.taux_commission_provisoire
                                doc.taux_de_commission  = tiers.taux_de_commission
                                doc.taux_de_la_surcommission = tiers.taux_de_la_surcommission
                                doc.echelle_de_commission = tiers.echelle_de_commission
                                doc.base_de_calcul_des_interets =tiers.base_de_calcul_des_interets
                                doc.taux_interets = tiers.taux_interets
                                doc.pb_ou_pp =tiers.pb_ou_pp
                                doc.nature_de_la_pb = tiers.nature_de_la_pb
                                doc.nature_de_la_pp =tiers.nature_de_la_pp
                                doc.taux_de_la_pb = tiers.taux_de_la_pb
                                doc.taux_echelonnee = tiers.taux_echelonnee
                                doc.pp_fixe = tiers.pp_fixe
                                doc.pp_echelonnee = tiers.pp_echelonnee
                                doc.affectation_comptable = tiers.affectation_comptable
                                doc.link_doctype = tiers.link_doctype
                                doc.bonification_pour_non_sinistre = tiers.bonification_pour_non_sinistre
                                doc.taux_de_bonification = tiers.taux_de_bonification
                                doc.insert()

                                part_reassurance_list = frappe.get_all("child reassurer",
                                                                        filters={"parenttype": 'Tiers',
                                                                                 'parent': tiers.name},
                                                                        fields=["*"])
                                for part in part_reassurance_list:
                                        doc = frappe.new_doc('child reassurer')
                                        doc.parenttype = "Tiers"
                                        doc.parent = new_nom_tiers
                                        doc.code_reassurer = part.code_reassurer
                                        doc.part_de_reassureur = part.part_de_reassureur
                                        doc.idx = part.idx
                                        doc.parentfield = "part_de_chaque_réassureur_derrière_les_courtiers"
                                        doc.insert()





























































