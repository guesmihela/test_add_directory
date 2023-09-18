frappe.listview_settings['Courtier'] = {
    hide_name_column : true, // HIDE THE NAME COLUMN IN THE LAST
    skip_kanban: true, // HIDE THE KANBAN VIEW
    skip_dashboard: true,
	onload: function(listview) {
       $('*[data-fieldname="name"]').hide();
       $(".like-icon").hide();
       $(".like-action").hide();
        $(".list-row-like").hide();
       $(".icon").hide();
       $('#icon-heart').hide();
	  },
	/*refresh: function(listview) {

    }*/
 };