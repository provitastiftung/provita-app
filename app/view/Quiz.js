Ext.define('ProVita.view.Quiz', {
    extend: 'Ext.form.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
	fullscreen: true,
	defaults: {
	    styleHtmlContent: true
	},	
        items: [
	    {
		title: 'Start',
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
		    cls: 'titlebar1',
                    title: 'ProVita – Stiftung f&uuml;r Lebensethik'
                },
                html: [
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
		    cls: 'titlebar2',
                    title: 'Lebensanfang'
                },
                html: [
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
		    cls: 'titlebar3',
                    title: 'Lebenswert'
                },
                html: [
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
		    cls: 'titlebar4',
                    title: 'Lebensende'
                },
                html: [
                    "<p>Am Lebensende w&uuml;nschen wir uns ein, nach heutigen Ma&szlig;st&auml;ben lebenswertes, aktives Älterwerden im Kreise der Familie, oder einem f&uuml;r den Betroffenen w&uuml;rdigem Umfeld. Unsere Gesellschaft verursacht unbewusst, dass das Sterben teilweise kaum noch thematisiert wird. Miteinander scheinen wir zu vergessen oder zu verdr&auml;ngen, dass wir sterben werden – alle, unausweichlich.</p>",
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
    }
});
