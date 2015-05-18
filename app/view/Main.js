Ext.define('ProVita.view.Main', 
{
    extend: 'Ext.Container',
    xtype: 'mainPage',
    requires: 
    [
        'Ext.TitleBar',
        'Ext.form.Panel',
        'Ext.List',
        'Ext.navigation.View',
        'Ext.Component',
        'Ext.Panel',
	'Ext.Carousel',
	'Ext.form.FieldSet',
	'Ext.field.Email',
	'Ext.field.Number',
	'Ext.field.Toggle',
	'Ext.field.Hidden'
	//'Ext.device.Push'
    ],

    config: 
    {
        layout: 'fit',
        items:
        [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'ProVita',
                items:
                [
                    {
                        iconCls: 'list',
                        align: 'left',
                        handler: toggleMenu
                    }
                ]
            },

            {
                xtype: 'container',
                layout: 'hbox',
                itemId: 'container1',
                items:
                [

                    {
                        xtype: 'container',
                        layout: 'card',
                        width: 250,
                        hidden: true,
                        itemId: 'navContainer',
                        style: 'position: absolute; top: 0; left: 0; height: 100%;z-index: 2',
                        zIndex : 1,
                        items:
                        [
                            {
                                xtype: 'list',
                                itemTpl: '{title}',
                                data:
                                [
                                    { title: 'Start' },
				    { title: '<span style="font-weight:bold">Quiz</bold>' },
                                    { title: 'Aktuelle Infomail' },
                                    { title: 'Nachrichten' },
                                    { title: 'Veranstaltungen' },
                                    { title: 'Die Stiftung' },
                                    { title: 'Kontakt' }               
                                ],
				listeners : {
				    itemtap: function(dataview, index, item, e) {
					switch(index) {
					    case 0:
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(0);
						toggleMenu();
						break;
					    case 1:
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(1);
						toggleMenu();
						break;
					    case 2:
						Ext.Ajax.request({
						    url: 'http://www.provita-stiftung.de/appjson.cgi',
						    useDefaultXhrHeader: false,
						    disableCaching: false,
						    method: 'GET',
						    success : function(response) {
							var json = Ext.util.JSON.decode(response.responseText)
							var c = Ext.ComponentQuery.query("#newsCards")[0];
							var p0 = Ext.create('Ext.Panel', 
							    {
								title: 'Aktuelle Infomail',
								scrollable: 'vertical',
								items: [
								    {
			    						title: 'Aktuelle Infomail',
									docked: 'top',
									xtype: 'titlebar' 
								     }
								],
								html: json.aktuelles.main
							    });
							c.add(p0);
							c.animateActiveItem(1, { type: 'pop' });
						    },
						    failure : function(response) {  
							var text = response.responseText;
							Ext.Msg.alert('Error', 'Die aktuelle Infomail konnte leider nicht geladen werden. ', Ext.emptyFn);            
							var c = Ext.ComponentQuery.query("#newsContainer")[0];
							c.setHtml('<p>Die aktuelle Infomail konnte leider nicht geladen werden.</p>');
							c.unmask();
						    }
						});
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(2);
						toggleMenu();
						break;
					    case 3:
						Ext.Ajax.request({
						    url: 'http://www.provita-stiftung.de/appjson.cgi',
						    useDefaultXhrHeader: false,
						    disableCaching: false,
						    method: 'GET',
						    success : function(response) {
							var json = Ext.util.JSON.decode(response.responseText)
							var html = '';
							Ext.Array.each(json.nachrichten, function(nachricht, index, nachrichtenItSelf) {
							    html = html + '<h1>' + nachricht.caption + '</h1>' + nachricht.about + nachricht.main + "<br />";
							});
							var c = Ext.ComponentQuery.query("#news2Cards")[0];
							var p0 = Ext.create('Ext.Panel', 
							    {
								title: 'Nachrichten',
								scrollable: 'vertical',
								items: [
								    {
			    						title: 'Nachrichten',
									docked: 'top',
									xtype: 'titlebar' 
								     }
								],
								html: html
							    });
							c.add(p0);
							c.animateActiveItem(1, { type: 'pop' });
						    },
						    failure : function(response) {  
							var text = response.responseText;
							Ext.Msg.alert('Error', 'Die Nachrichten konnten leider nicht geladen werden.', Ext.emptyFn);            
							var c = Ext.ComponentQuery.query("#news2Container")[0];
							c.setHtml('<p>Die Nachrichten konnten leider nicht geladen werden.</p>');
							c.unmask();
						    }
						});
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(3);
						toggleMenu();
						break;
					    case 4:
						Ext.Ajax.request({
						    url: 'http://www.provita-stiftung.de/appjson.cgi',
						    useDefaultXhrHeader: false,
						    disableCaching: false,
						    method: 'GET',
						    success : function(response) {
							var json = Ext.util.JSON.decode(response.responseText)
							var html = '';
							Ext.Array.each(json.veranstaltungen, function(veranstaltung, index, veranstaltungenItSelf) {
							    html = html + '<h1>' + veranstaltung.caption + '</h1>' + veranstaltung.about + veranstaltung.main;
							});
							var c = Ext.ComponentQuery.query("#news3Cards")[0];
							var p0 = Ext.create('Ext.Panel', 
							    {
								title: 'Veranstaltungen',
								scrollable: 'vertical',
								items: [
								    {
			    						title: 'Veranstaltungen',
									docked: 'top',
									xtype: 'titlebar' 
								     }
								],
								html: html
							    });
							c.add(p0);
							c.animateActiveItem(1, { type: 'pop' });
						    },
						    failure : function(response) {  
							var text = response.responseText;
							Ext.Msg.alert('Error', 'Die Veranstaltungen konnten leider nicht geladen werden.', Ext.emptyFn);            
							var c = Ext.ComponentQuery.query("#news3Container")[0];
							c.setHtml('<p>Die Veranstaltungen konnten leider nicht geladen werden.</p>');
							c.unmask();
						    }
						});
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(4);
						toggleMenu();
						break;
					    case 5:
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(5);
						toggleMenu();
						break;
					    case 6:
						Ext.ComponentQuery.query('#mainContainer')[0].setActiveItem(6);
						toggleMenu();
						break;
					    default:
						Ext.Msg.alert('Bitte etwas Geduld', 'Diese Funktion ist leider noch nicht verf&uuml;gbar.');
					}
					
				    }
			        }
                            }
                        ]
                    },

                    {
			// card container
                        xtype: 'container',
                        layout: 'card',
                        itemId: 'mainContainer',
			width: '100%',
                        items:
                        [
			    {
				// info carousel
				xtype: 'carousel',
				itemId: 'carouselContainer',
				items: 
				[
				    {
					title: 'Start',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'ProVita – Stiftung f&uuml;r Lebensethik'
					},
					html: [
					    '<p><img src="resources/images/provita.jpg" /></p>',
					    "<p>Lebensethik und Lebensrecht stehen dauerhaft im Fokus der politischen und gesellschaftlichen Diskussion. Durch neue wissenschaftliche Erkenntnisse und den sich daraus entwickelnden Diagnose- und Therapieverfahren ergeben sich neue Krisensituationen mit Grenzerfahrungen menschlichen Lebens. Nur im Kontext der konkreten Lebensgeschichte und der jeweiligen Leid-Erfahrung angemessen, k&ouml;nnen medizinethische, seelsorgerliche und therapeutische Antworten gemeinsam mit den Betroffenen gesucht und gefunden werden.</p>",
					    "<p>Das Leben und die einzigartige W&uuml;rde des Menschen als unantastbare Gabe Gottes sind von Anfang an und bis zu dessen Ende zu sch&uuml;tzen und zu respektieren.</p>",
					    "<p>ProVita will mit seiner Arbeit aufkl&auml;ren und auch begleiten. Das christliche Menschenbild und die Hinwendung zum Leben in all seiner Differenziertheit bilden hierzu die Ausgangsbasis.</p>",
					    "<p>Wir m&ouml;chten christlich begr&uuml;ndete Orientierungshilfe in medizinethischen Fragen geben. Wir organisieren Seminare und Publikumsveranstaltungen, beraten Fachleute, publizieren Stellungnahmen, versenden Info-Mails und erstellen Diskussionsgrundlagen zu vielen aktuellen lebensethischen Fragen und Problemen.</p>"
					].join("")
				    },
				    {
					title: 'Lebensanfang',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Lebensanfang'
					},
					html: [
					    '<img src="resources/images/slider0.jpg" />',
					    "<p>Die Situation zum Lebensanfang eines neuen Menschen ist im besten Fall von Hoffnung und Vorfreude gepr&auml;gt. H&auml;ufig genug stehen aber auch schon Zweifel und Krisen dem uneingeschr&auml;nkten Wohl des sich entfaltenden Menschen entgegen. Es gibt immer wieder Fragen, Hindernisse, schwierige Entscheidungen und auch Leiderfahrungen zum Lebensanfang eines Menschen.</p>",
					    "<p>Wir wollen F&uuml;rsprecher sein f&uuml;r den Lebensschutz und die W&uuml;rde des Menschen von Anfang an. Deshalb bieten wir Hilfestellung zur Beantwortung von Fragen zu",
					    "<ul><li>vorgeburtlicher Diagnostik</li>",
					    "<li>Stammzellforschung</li>",
					    "<li>therapeutischem und reproduktivem Klonen</li>",
					    "<li>Embryonenforschung und Embryonenschutz</li>",
					    "<li>Gendiagnostik und PID (Pr&auml;implantationsdiagnostik)</li>",
					    "<li>Kinderwunsch</li>",
					    "<li>Begleitung im Schwangerschaftskonflikt</li>",
					    "<li>Sexualethik</li></ul></p>",
					    "<p>Diesen Themen wollen wir uns immer wieder neu zusammen mit den Betroffenen, mit Pastoren, Seelsorgern und Fachleuten jeweils aktuell stellen. Wir f&uuml;hlen uns dabei der Nachfolgeethik von Jesus Christus verpflichtet, der bei den Menschen blieb, mit ihnen Wege ging, Wege zum Leben.</p>"
					].join("")
				    },
				    {
					title: 'Lebenswert',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Lebenswert'
					},
					html: [
					    '<img src="resources/images/slider1.jpg" />',
					    "<p>Die Mitte des Lebens ist gepr&auml;gt von Verantwortung f&uuml;r das eigene Leben, das der Mitmenschen, das Leben der Kinder, der Enkelkinder und oft auch der eigenen Eltern. Dabei ist die mittlere Generation nicht gesch&uuml;tzt vor Herausforderungen im eigenen pers&ouml;nlichen Erleben. In der Mitte des Lebens werden wir konfrontiert mit dem Verlust von befreundeten Menschen, z.B. durch Unfallereignisse und Erkrankungen. Auch das eigene Leben wird ggf. durch chronische Krankheiten, Beziehungs-Krisen und berufliches Scheitern belastet .</p>",
					    "<p>Wir wollen Mut machen zum Wahrnehmen solcher Krisenereignisse, und zur Suche nach L&ouml;sungen. Dazu bieten wir Diskussionsbeitr&auml;ge und Hintergrundinformationen.</p>",
					    "<p>Wir bieten auch Hilfestellungen bei Fragen zu",
					    "<ul><li>Pflegeethik</li>",
					    "<li>dem Umgang mit Behinderungen und chronischen Erkrankungen</li>",
					    "<li>Organspende</li>",
					    "<li>Gentechnik und verwandten medizinisch-technischen Grenzgebieten</li></ul></p>",
					    "<p>Wir wollen aufzeigen, dass Menschen an Herausforderungen wachsen k&ouml;nnen, manchmal sogar &uuml;ber sich hinaus wachsen k&ouml;nnen. Es gibt die geistige und geistliche F&auml;higkeit, aus widrigen Lebensumst&auml;nden gest&auml;rkt und mit gr&ouml;&szlig;eren Ressourcen ausgestattet wieder heraus zu kommen. Wir wollen nach dem Vorbild von Jesus Christus Leben teilen, informieren, begleiten und der Hoffnung eine Chance geben.</p>"
					].join("")
				    },
				    {
					title: 'Lebensende',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Lebensende'
					},
					html: [
					    '<img src="resources/images/slider2.jpg" />',
					    "<p>Am Lebensende w&uuml;nschen wir uns ein, nach heutigen Ma&szlig;st&auml;ben lebenswertes, aktives &Auml;lterwerden im Kreise der Familie, oder einem f&uuml;r den Betroffenen w&uuml;rdigem Umfeld. Unsere Gesellschaft verursacht unbewusst, dass das Sterben teilweise kaum noch thematisiert wird. Miteinander scheinen wir zu vergessen oder zu verdr&auml;ngen, dass wir sterben werden – alle, unausweichlich.</p>",
					    "<p>Selbstbestimmt zu leben ist ein hohes Gut, aber am Lebensende k&ouml;nnen Krankheit und Behinderung die Selbstbestimmung einschr&auml;nken. Es gibt Ma&szlig;nahmen der Vorsorge, dass auch in diesem Fall der eignene Wille noch weitest m&ouml;glich umgesetzt werden kann. Es ist uns ein Anliegen hierzu zu informieren und zu beraten.</p>",
					    "<p>Weitere verwandte Themen am Lebensende sind",
					    "<ul><li>Palliativmedizin</li>",
					    "<li>Sterbebegleitung</li>",
					    "<li>Patientenverf&uuml;gung</li>",
					    "<li>Vorsorge- und Generalvollmacht</li>",
					    "<li>passive Sterbehilfe</li>",
					    "<li>Diskussion um aktive Sterbehilfe</li></ul></p>",
					    "<p>„Die W&uuml;rde des Menschen ist unantastbar“ hei&szlig;t es in Artikel 1 des deutschen Grundgesetzes. Sie ist nicht verhandelbar, nicht teilbar, nicht nur bedingt oder nur zeitweise vorhanden. W&uuml;rde ist da, wo Menschen leben und solange sie leben.</p>",
					    "<p>Nach christlichen Vorstellungen ist uns diese W&uuml;rde von Gott, unserem Sch&ouml;pfer, verliehen worden. Gott hat sie uns ein f&uuml;r allemal verliehen, sie geh&ouml;rt untrennbar zu jedem menschlichen Leben. Und nur Gott setzt ihr Grenzen, indem er entscheidet &uuml;ber Leben und Tod.</p>",
					    "<p>In diesem Sinne wollen wir helfen und uns daf&uuml;r einsetzen dem Alter und dem Sterben die W&uuml;rde zu bewahren.</p>"
					].join("")
				    }
				]
			    }, 
			    {
				// quiz
				xtype: 'panel',
				itemId: 'quizContainer',
				layout: 'card',
				items: 
				[
				    {
					// start
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Teste Dein Wissen rund um das Leben!<br />Beantworte das ProVita-Quiz und nimm an unserer Verlosung teil.", 
							selectable: false 
						    },
						    { 
							txt: "Los geht's!",
							name: 'los'
						    }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(1, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 1
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Das schlagende Herz eines Ungeborenen sieht man im Ultraschall ab der wievielten Woche einer Schwangerschaft?", 
							loesung: 1,
							selectable: false
						    },
						    { txt: "7. Woche", loesung: true },
						    { txt: "9. Woche", loesung: false },
						    { txt: "11. Woche", loesung: false },
						    { txt: "13. Woche", loesung: false },
						    { txt: "15. Woche", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(2, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 2
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "In 2/3 der Welt bekommen Frauen ihr erstes Kind im Durchschnitt ...", 
							loesung: 1,
							selectable: false
						    },
						    { txt: "Vor dem 20. Lebensjahr", loesung: true },
						    { txt: "Nach dem 20. Lebensjahr", loesung: false },
						    { txt: "Nach dem 25. Lebensjahr", loesung: false },
						    { txt: "Nach dem 30. Lebensjahr", loesung: false },
						    { txt: "Nach dem 35. Lebensjahr", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(3, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 3
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Beim Ungeborenen sind bis zur 12. Woche der Schwangerschaft bereits vollkommen ausgebildet:", 
							loesung: 5,
							selectable: false
						    },
						    { txt: "Arme und Beine", loesung: false },
						    { txt: "Das Herz", loesung: false },
						    { txt: "Die Leber", loesung: false },
						    { txt: "Die Nieren", loesung: false },
						    { txt: "Alle Organe", loesung: true }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(4, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 4
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "In Deutschland werden aktuell Ungeborene mit dem Down-Syndrom (Trisomie 21) von vielen M&uuml;ttern oder Eltern nicht akzeptiert. Abgetrieben werden aus diesem Grund ...", 
							loesung: 5,
							selectable: false
						    },
						    { txt: "10% der betroffenen Foeten", loesung: false },
						    { txt: "30% der betroffenen Foeten", loesung: false },
						    { txt: "50% der betroffenen Foeten", loesung: false },
						    { txt: "70% der betroffenen Foeten", loesung: false },
						    { txt: "90% der betroffenen Foeten", loesung: true }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(5, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 5
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Die meisten Abtreibungen weltweit geschehen aufgrund der Diagnose ...", 
							loesung: 5,
							selectable: false
						    },
						    { txt: "Das Kind wird ein Zwitter", loesung: false },
						    { txt: "Das Kind hat keine Arme und Beine", loesung: false },
						    { txt: "Das Kind kann nach der Geburt nicht &uuml;berleben", loesung: false },
						    { txt: "Das Kind hat einen Herzfehler", loesung: false },
						    { txt: "Das Kind wird ein M&auml;dchen", loesung: true }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(6, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 6
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "In Deutschland diskutiert man seit Jahren &uuml;ber das Thema Abtreibung. Richtig ist ...", 
							loesung: 4,
							selectable: false
						    },
						    { txt: "In Deutschland ist Abtreibung nur in den ersten 10 Schwangerschaftswochen erlaubt", loesung: false },
						    { txt: "In Deutschland ist Abtreibung bis zur 23. Schwangerschaftswoche erlaubt", loesung: false },
						    { txt: "In Deutschland ist Schwangerschaftsabbruch generell erlaubt", loesung: false },
						    { txt: "In Deutschland ist Schwangerschaftsabbruch generell verboten", loesung: true },
						    { txt: "In Deutschland ist Schwangerschaftsabbruch noch nie verboten gewesen", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(7, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 7
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "F&uuml;r Frauen, die ihr Kind abgetrieben haben, gilt h&auml;ufig ...", 
							loesung: 3,
							selectable: false
						    },
						    { txt: "Sie sind froh, kein Kind versorgen zu m&uuml;ssen", loesung: false },
						    { txt: "Sie w&uuml;rden das jederzeit noch einmal machen", loesung: false },
						    { txt: "Sie w&uuml;rden das Geschehene oft gerne wieder r&uuml;ckg&auml;ngig machen", loesung: true },
						    { txt: "Sie w&uuml;rden jedem raten es genauso zu machen", loesung: false },
						    { txt: "Sie finden eine solche Entscheidung ganz allt&auml;glich", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(8, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 8
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Die Wahrscheinlichkeit f&uuml;r eine Frau spontan schwanger zu werden ...", 
							loesung: 1,
							selectable: false
						    },
						    { txt: "nimmt ab dem 35. Lebensjahr rapide ab", loesung: true },
						    { txt: "ist bis zum 50. Lebensjahr etwa gleichbleibend", loesung: false },
						    { txt: "ist zwischen dem 18. und 28. Lebensjahr am niedrigsten", loesung: false },
						    { txt: "ist vor dem 30. Lebensjahr gering", loesung: false },
						    { txt: "ist ausschlie&szlig;lich vom Mann abh&auml;ngig", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(9, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 9
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Die aktuelle von staatlicher Seite angegebene Zahl von Abtreibungen pro Jahr liegt in Deutschland ...", 
							loesung: 3,
							selectable: false
						    },
						    { txt: "unter 10.000", loesung: false },
						    { txt: "unter 100.000", loesung: false },
						    { txt: "deutlich &uuml;ber 100.000", loesung: true },
						    { txt: "wird geheim gehalten", loesung: false },
						    { txt: "ist nicht bekannt", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(10, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 10
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Aktive Sterbehilfe wird in Deutschland seit Jahren widerspr&uuml;chlich diskutiert, momentan ist aktive Sterbehilfe in Deutschland ...", 
							loesung: 2,
							selectable: false
						    },
						    { txt: "nur in Ausnahmef&auml;llen erlaubt", loesung: false },
						    { txt: "auch in Ausnahmef&auml;llen verboten", loesung: true },
						    { txt: "nur vom Arzt durchzuf&uuml;hren", loesung: false },
						    { txt: "nur im Krankenhaus durchzuf&uuml;hren", loesung: false },
						    { txt: "ausschlie&szlig;lich Sterbe-Instituten vorbehalten", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(11, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 11
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Passive Sterbehilfe bedeutet, Menschen das Sterben zu erleichtern, in dem man ihnen ...", 
							loesung: 4,
							selectable: false
						    },
						    { txt: "das Essen verweigert", loesung: false },
						    { txt: "nichts mehr zu Trinken anbietet", loesung: false },
						    { txt: "alle Medikamente verweigert", loesung: false },
						    { txt: "auf lebensverl&auml;ngernde Ma&szlig;nahmen verzichtet", loesung: true },
						    { txt: "Schmerzmittel &uuml;berdosiert", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(12, { type: 'slide', direction: 'left' });
						    }
						}
					    }
					]
				    },
				    {
					// frage 12
					title: 'Quiz',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						title: 'Quiz',
						xtype: 'list',
						height: '100%',
						itemTpl: '{txt}',
						data: [
						    { 
							txt: "Laut einer Umfrage m&ouml;chten 66% der befragten Deutschen nach M&ouml;glichkeit zu Hause sterben. Wo sterben tats&auml;chlich die meisten Menschen?", 
							loesung: 2,
							selectable: false
						    },
						    { txt: "Zu Hause", loesung: false },
						    { txt: "Im Krankenhaus", loesung: true },
						    { txt: "In Pflegeheimen", loesung: false },
						    { txt: "Im Hospiz oder einer Palliativ-Station", loesung: false },
						    { txt: "An anderen Orten", loesung: false }
						],
						listeners:{
						    select:function(list, model){
							if(model.get('selectable') === false){
							    list.deselect(model);
							    return false;
							}
							if (model.get('loesung') === true ) {
							    Ext.Msg.alert('Gl&uuml;ckwunsch', "Das war richtig!<br/>Weiter geht's ...");
							    ProVita.utils.Global.setQuizTreffer(ProVita.utils.Global.getQuizTreffer() + 1);
							} else  {
							    var loesung = list.getStore().getAt(list.getStore().getAt(0).get('loesung')).get('txt');
							    Ext.Msg.alert('Knapp daneben', 'Das war leider die falsche Antwort.<br/><br/>Die richtige Antwort lautet:<br /><span style="font-weight:bold;">'+loesung+"</span><br />(im Krankenhaus: 50%, im Pflegeheim 25%, zu Hause 20%, im Hospiz 15%)<br /><br />Weiter geht's ...", Ext.emptyFn);
							}
							Ext.ComponentQuery.query('#quizResult')[0].setTitle('Dein Ergebnis: ' + ProVita.utils.Global.getQuizTreffer() + ' richtige Antworten von 12 Fragen.<br />Nimm an der ProVita Verlosung teil!');
							Ext.ComponentQuery.query('#quizResultScore')[0].setValue( ProVita.utils.Global.getQuizTreffer() );
							Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(13, { type: 'slide', direction: 'left' });
							
						    }
						}
					    }
					]
				    },
				    {
					// Ergebnis und Verlosung
					title: 'Quiz',
					layout: 'fit',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						xtype: 'formpanel',
						items: 
						[
						    {
							xtype: 'fieldset',
							itemId: 'quizResult',
							title: '',
							instructions: 'Die Anfrage wird verschl&uuml;sselt &uuml;bertragen und keine weiteren Daten Deiner Anfrage gespeichert.<br />Dein Name wird in der Bestenliste und - falls Du gewinnst - auf der ProVita-Homepage ver&ouml;ffentlicht.<br />Jede E-Mail-Adresse nimmt nur einmal an der Verlosung teil.',
							items: [
							    {
								xtype: 'textfield',
								name : 'name',
								label: 'Name'
							    },
							    {
								xtype: 'emailfield',
								name : 'email',
								label: 'Email'
							    },
							    {
								xtype: 'hiddenfield',
								name : 'score',
								itemId: 'quizResultScore'
							    }
							]
						    },
						    {
							xtype: 'button',
							text: 'Teilnehmen',
							ui: 'confirm',
							handler: function() {
							    Ext.Ajax.request({
								url: 'https://app.provita-stiftung.de/quiz.php',
								params: this.up('formpanel').getValues(),
								useDefaultXhrHeader: false,
								disableCaching: false,
								method: 'POST',
								success : function(response) {
								    Ext.Msg.alert('Danke', 'Du nimmst an der Verlosung teil!', Ext.emptyFn);
								},
								failure : function(response) {  
								    Ext.Msg.alert('Fehler', 'Die Anfrage konnte leider nicht abgeschickt werden.', Ext.emptyFn);
								}
							    });
							    /*
							    this.up('formpanel').submit({
								url: 'https://app.provita-stiftung.de/quiz.php',
								method: 'POST',
								success: function() {
								    Ext.Msg.alert('Danke', 'Du nimmst an der Verlosung teil!', Ext.emptyFn);
								},
								failure: function() {
								    Ext.Msg.alert('Fehler', 'Die Anfrage konnte leider nicht abgeschickt werden.', Ext.emptyFn);
								}
							    });
							    */
							    Ext.Ajax.request({
								url: 'https://app.provita-stiftung.de/quiz.php',
								useDefaultXhrHeader: false,
								disableCaching: false,
								method: 'POST',
								success : function(response) {
								    var json = Ext.util.JSON.decode(response.responseText)
								    var highscore = "Die Bestenliste<br /><br />";
								    Ext.Array.each(json.highscore, function(name, index) {
									highscore = highscore + name.name + " (" + name.score + " richtige Antworten)<br />";
									
								    });
								    Ext.ComponentQuery.query('#quizHighscore')[0].setTitle(highscore);
								    Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(14, { type: 'slide', direction: 'left' });
								},
								failure : function(response) {  
								    Ext.Msg.alert('Error', 'Die Bestenliste konnte leider nicht geladen werden.', Ext.emptyFn);            
								    Ext.ComponentQuery.query('#quizContainer')[0].animateActiveItem(14, { type: 'slide', direction: 'left' });
								}
							    });
							}
						    }
						]
					    }
					]
				    },
				    {
					// Ergebnis und Verlosung
					title: 'Quiz',
					layout: 'fit',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title:'Quiz'
					    },
					    {
						xtype: 'formpanel',
						items: 
						[
						    {
							xtype: 'fieldset',
							itemId: 'quizHighscore',
							title: '',
							instructions: 'Der Gewinner wird per E-Mail benachricht und der Name auf der ProVita-Homepage ver&ouml;ffentlicht.',
							items: []
						    }
						]
					    }
					]
				    }
				]
			    },                            
			    {
				// infomail
				xtype: 'panel',
				layout: 'card',
				cls: 'news',
				itemId: 'newsCards',
				items: 
				[
				    {
					// start
					title: 'Aktuelle Infomail',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title: 'Aktuelle Infomail'
					    },
					    {
						// infomail
						itemId: 'newsContainer',
						cls: 'news',
						masked: { xtype: 'loadmask', message: 'Die aktuelle Infomail wird geladen...' }
					    }
					]
				    }
				]
			    },					    
			    {
				// nachrichten
				xtype: 'panel',
				layout: 'card',
				cls: 'news',
				itemId: 'news2Cards',
				items: 
				[
				    {
					// start
					title: 'Nachrichten',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title: 'Nachrichten'
					    },
					    {
						// Nachrichten
						itemId: 'news2Container',
						cls: 'news',
						scrollable: 'vertical',
						masked: { xtype: 'loadmask', message: 'Die Nachrichten werden geladen...' }
					    },
					]
				    }
				]
			    },
			    {
				// Veranstaltungen
				xtype: 'panel',
				layout: 'card',
				cls: 'news',
				itemId: 'news3Cards',
				items: 
				[
				    {
					// start
					title: 'Veranstaltungen',
					items: [
					    {
						xtype: 'titlebar',
						docked: 'top',
						title: 'Veranstaltungen'
					    },
					    {
						// Veranstaltungen
						itemId: 'news3Container',
						cls: 'news',
						masked: { xtype: 'loadmask', message: 'Die Veranstaltungen werden geladen...' },
					    }
					]
				    }
				]
			    },
			    {
				// info carousel
				xtype: 'carousel',
				itemId: 'stiftungContainer',
				items: 
				[
				    {
					title: 'Die Stiftung - Zweck',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Die Stiftung - Zweck'
					},
					html: [
					    "<p>Die Stiftung ProVita verfolgt ausschlie&szlig;lich und unmittelbar kirchliche und gemeinn&uuml;tzige Zwecke im Sinne des Abschnitts „Steuerbeg&uuml;nstigte Zwecke“ der Abgabenordnung. Zweck der Stiftung ist die F&ouml;rderung der kirchlichen und religi&ouml;sen Belange aller auf der Basis der Deutschen Evangelischen Allianz stehenden kirchlichen K&ouml;rperschaften und Institutionen im Bereich Ja zum Leben.</p>",
					    "<p>Der Zweck der Stiftung wird, ausgehend vom christlichen Menschenbild und der Hinwendung zum Leben in all seiner Differenziertheit, im In- und Ausland insbesondere verwirklicht durch",
					    "<ul><li>Aufkl&auml;rung und Sensibilisierung</li>",
					    "<li>Aufkl&auml;rung und Sensibilisierung</li>",
					    "<li>Hilfsangebote an Betroffene, um auch unter schwierigen Bedingungen ein Ja zum Leben finden zu k&ouml;nnen</li>",
					    "<li>Ma&szlig;nahmen, in denen Aufkl&auml;rung, Beratung und Informationsweitergabe geleistet werden</li>",
					    "<li>Begleitung in ethischen Gewissenskonflikten mit dem Ziel der Hilfe zum Leben</li>",
					    "<li>F&ouml;rderung von Leben und Ermutigung zum Leben pr&auml;- und postnatal, sowie in den Herausforderungen des Lebens in Krankheit und Leid</li>",
					    "<li>Beratung zu den Fragen des Lebensendes, zum Sterben in W&uuml;rde, Sterbe- und Pflegeethik</li>",
					    "<li>Hilfe bei der Suche nach Entscheidungskriterien</li>",
					    "<li>Familien- und Erwachsenenbildung</li>",
					    "<li>Fortbildung f&uuml;r Mitarbeiter, ehrenamtliche Helfer, Interessierte und Betroffene</li>",
					    "<li>Vortr&auml;ge, Diskussionsveranstaltungen, Seminare, Austausch-B&ouml;rsen, Internet-Auftritte</li>",
					    "<li>Unterst&uuml;tzung anderer Organisationen bei Aktivit&auml;ten, die dem Stiftungszweck entsprechen</li></ul>"
					].join("")
				    },
				    {
					title: 'Die Stiftung',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Die Stiftung'
					},
					html: [
					    '<p><img src="resources/images/zweck.jpg" /></p>',
					    "<p>Wir stehen ein f&uuml;r</p>",
					    "<ul><li>den Schutz der Menschenw&uuml;rde und des Lebensrechtes eines jeden Einzelnen</li>",
					    "<li>die Achtung des Lebens Ungeborener und der W&uuml;rde von Menschen, die sich nicht selbst zu eigenen Belangen &auml;u&szlig;ern k&ouml;nnen</li>",
					    "<li>der kritischen Begleitung der M&ouml;glichkeiten des rasanten biotechnologischen Fortschritts</li>",
					    "<p>ProVita ist</p>",
					    "<li>eine eingetragene Stiftung</li>",
					    "<li>Kooperationspartner in lebensethischen Fragen f&uuml;r den Bund Freier evangelischer Gemeinden</li>",
					    "<li>Mitglied im Bundesverband Lebensrecht (BVL)</li>",
					    "<li>Netzwerkpartner gemeinsam mit anderen Lebensrechtsgruppen und Initiativen</li></ul>"
					].join("")
				    },
				    {
					title: 'Die Stiftung - Vorstand',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Die Stiftung - Vorstand'
					},
					html: [
					    "<p>Dem Vorstand der Stiftung ProVita geh&ouml;ren an: </p>",
					    '<p><img src="resources/images/vorstand.jpg" /></p>',
					    "<ul><li>Dr. Detlev Katzwinkel (Vorsitzender)</li>",
					    "<li>Dr. Heike Fischer (Gesch&auml;ftsf&uuml;hrerin)</li>",
					    "<li>Friedhelm Loh</li>",
					    "<li>Michael Borkowski</li>",
					    "<li>Volker Reder</li></ul></p>",
					    "<p>Der Vorstand wir durch den Stiftungsrat beraten und unterst&uuml;tzt.</p>"
					].join("")
				    },
				    {
					title: 'Die Stiftung - Ver&ouml;ffentlichungen',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Die Stiftung - Ver&ouml;ffentlichungen'
					},
					html: [
					    "<p>Diese Seite ist aktuell noch im Aufbau, weitere Texte und Ver&ouml;ffentlichungen folgen.</p>",
					    "<p>Autor: Dr. Detlev Katzwinkel:</p>",
					    "<ul><li>Das Kind, das ich nie geboren habe, SCM Brockhaus, ISBN 978-3-417-26212-4 (2007)</li>",
					    '<li>Zum Umgang mit Fehlgeburten, Totgeburten und abgetriebenen Kindern in Kliniken und Instituten, Beitrag in "Sie schauen das Antlitz Gottes" Teresa Loichen (Hrsg.), S. 47-62, Verlag Friedrich Pustet, ISBN 978-37917-2460-7 (2012)</li>',
					    '<li>MITGEDACHT 1/2002: Leben annehmen statt ausw&auml;hlen - zum Problem der pr&auml;natlen Diagnostik herausgegeben vom "Gespr&auml;chskreis f&uuml;r soziale Fragen" MITGEDACHT ist zu beziehen bei der Gesch&auml;ftsstelle des Bundes Freier evangelischer Gemeinden, Goltenkamp 4, 58452 Witten</li></ul>'
					].join("")
				    },
				    {
					title: 'Die Stiftung - Zusammenarbeit',
					scrollable: true,

					items: {
					    docked: 'top',
					    xtype: 'titlebar',
					    title: 'Die Stiftung - Zusammenarbeit'
					},
					html: [
					    "<p>Die Stiftung ProVita arbeitet zusammen mit</p>",
					    "<ul><li>dem Bund Freier evangelischer Gemeinden Kd&ouml;R</li>",
					    "<li>dem Bund Evangelisch Freikirchlicher Gemeinden</li>",
					    "<li>dem Treffen christlicher Lebensrechtsgruppen (TCLG)</li>",
					    "<li>ist Mitglied im Bundesverband Lebensrecht (BVL)</li>",
					    '<li>der Beratungsstelle Aus-WEG?! des Vereins "Hilfe zum Leben Pforzheim e.V."</li></ul>',
					    '<p>Dr. Detlev Katzwinkel (Vorsitzender) ist Mitglied der Bundesarbeitsgemeinschaft „Folgen nach Fehlgeburt, Totgeburt und Schwangerschaftsabbruch"</p>'
					].join("")
				    }
				]
			    },
			    {
				// kontakt
				xtype: 'formpanel',
				itemId: 'kontaktContainer',
				items: [
				    {
					xtype: 'fieldset',
					title: 'Fragen? Probleme? Wir sind f&uuml;r Dich da.',
					instructions: 'Die Anfragen werden verschl&uuml;sselt &uuml;bertragen, keine weiteren Daten Deiner Anfrage gespeichert und die &uuml;bermittelte Anfrage wird vertraulich behandelt.',
					items: [
					    {
						xtype: 'textfield',
						name : 'name',
						label: 'Name'
					    },
					    {
						xtype: 'emailfield',
						name : 'email',
						label: 'Email'
					    },
					    {
						xtype: 'numberfield',
						name : 'telefon',
						label: 'Telefon'
					    },
					    {
						xtype: 'togglefield',
						name : 'rueckruf',
						label: 'Bitte rufen Sie mich zur&uuml;ck!'
					    },
					    {
						xtype: 'textareafield',
						name : 'nachricht',
						label: 'Ihre Nachricht',
						maxRows: 5
					    }
					]
				    },
				    {
					xtype: 'button',
					text: 'Absenden',
					ui: 'confirm',
					handler: function() {
					    Ext.Ajax.request({
						url: 'https://app.provita-stiftung.de/kontakt.php',
						params: this.up('formpanel').getValues(),
						useDefaultXhrHeader: false,
						disableCaching: false,
						method: 'POST',
						success : function(response) {
						    Ext.Msg.alert('Danke', 'Deine Anfrage wurde abgeschickt.', Ext.emptyFn);
						},
						failure : function(response) {  
						    Ext.Msg.alert('Fehler', 'Die Anfrage konnte leider nicht abgeschickt werden.', Ext.emptyFn);
						}
					    });
					    //this.up('formpanel').reset();
					    /*
					    this.up('formpanel').submit({
						url: 'https://app.provita-stiftung.de/kontakt.php',
						method: 'POST',
						success: function(response) {
						    Ext.Msg.alert('Danke', 'Deine Anfrage wurde abgeschickt.', Ext.emptyFn);
						},
						failure: function(response) {
						    Ext.Msg.alert('Fehler', 'Die Anfrage konnte leider nicht abgeschickt werden.', Ext.emptyFn);
						}
					    });
					    */
					}
				    }
				]				
			    }
			]
                    }
		]
            }
        ]
    }
});

function toggleMenu() {
    var con1 = Ext.ComponentQuery.query('container > #container1')[0];
    var draggable = Ext.ComponentQuery.query('container > #navContainer')[0];
    if(con1.element.hasCls('out'))
    {
	draggable.hide({type: 'slideOut', direction: 'left', duration : 300});
	con1.element.removeCls('out').addCls('in');
    }
    else
    {
	con1.element.removeCls('in').addCls('out');
	draggable.show({type:'slideIn', direction:'right', duration : 300});
    }
}