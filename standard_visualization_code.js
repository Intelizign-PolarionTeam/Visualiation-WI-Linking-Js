var currentURL = window.location.href;
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

var _drawIoActionLocalStorage = urlParams.get("drawIoAction");
if (_drawIoActionLocalStorage == "create") {

    const PROJECTID = urlParams.get("projectId");
    var _hostNameLocalStorage = urlParams.get("hostName");
    var APIURL = "https://" + _hostNameLocalStorage + "/polarion/rest/v1/projects/" + PROJECTID;
    const BEARERTOKEN = "eyJraWQiOiJmMmM4NzE2MC03ZjAwMDAwMS00Mzc5NTRmZC0wNWI4MTc2NiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJCQm0yIiwiaWQiOiIxM2NiNGRlYy0wYTBiOGY1My00NmUzOTBiYi02MTIxY2YwZCIsImV4cCI6MTc0OTM1NTIwMCwiaWF0IjoxNzQ0MDg4ODEzfQ.s9daEM16DB2mDjLKzhcE57b9NaM5lk0TwJumB_c1K70X7NsoyQjtcu-gCXS56jh53yja3FQS1GYLVPJNLDMN3QdlJbicozt0vkSE-maPhQ4VDjwML1INlnBQRyOvx0V7Wz1Nv7K_1KUopHhO4e6PgHf_4mkbsov31hh_1cFRVtJD4-qXzc47QU47ePNPkDVPlH_X0D522XRizofSBKVYrPW_PuXdgaPl4Ee8T53oN18BgRktBsjWZhICTNWYAsklKa56uiqx84DonxBqFsdTjNumawkjdrhJzjPqhwqX76FOSWkwPqjbVeNlLcgFFBEKI7TX4IeAmeNu7Tt_jXJHAg";
    var _wiTypeLocalStorageArray = [];
    var colorCodes = ["#82B5FF", "#CCCCCC", "#FFE1AD", "#C39FFF", "#d1ff73", "#5c82b2", "#73ffec", "#F5A95C", "#56be9d", "#f1ff8257", "#73ff7c", "#ff73e2b0", "#ff7373", "#f1ff82", "#ffd382", "#56b5be", "#be7356", "#567cbe", "#425d87", "#c62e2e", "#c62e5c", "#aec6e6", "#e6aeae"];
    var shapeArray = ["document", "tape", "delay", "trapezoid", "dataStorage", "internalStorage", "step", "process", "rectangle", "rectangle;rounded=2", "ellipse", "triangle", "hexagon", "rhombus", "cylinder", "cloud", "parallelogram", "doubleEllipse", "cube"];

    getAllWorkItemTypes();

    function initializeCustomContextMenu(ui) {
        var editor = ui.editor;
        if (editor) {
            var graph = editor.graph;
            mxEvent.disableContextMenu(document.body);
            const linkRoleDataArray = [
                //Defining Linking Roles
                {
                    fromType: ["useStep", "userNeed", "function", "systemRequirement", "designRequirement", "designSpecification", "designOutput"],
                    toType: "VOC_VOB",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: ["userNeed", "function", "systemRequirement", "designRequirement", "designSpecification", "designOutput"],
                    toType: "useStep",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: ["function", "systemRequirement", "designRequirement", "designSpecification", "designOutput"],
                    toType: "userNeed",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: ["systemRequirement", "designRequirement", "designSpecification", "designOutput"],
                    toType: "function",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: ["designRequirement", "designSpecification", "designOutput"],
                    toType: "systemRequirement",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: ["designSpecification", "designOutput"],
                    toType: "designRequirement",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "designOutput",
                    toType: "designSpecification",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: ["useStep", "userNeed", "function", "systemRequirement", "designRequirement", "designSpecification", "designOutput"],
                    toType: "standard",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "useStep",
                    toType: "useStep",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "userNeed",
                    toType: "userNeed",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "function",
                    toType: "function",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "systemRequirement",
                    toType: "systemRequirement",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "designRequirement",
                    toType: "designRequirement",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "designSpecification",
                    toType: "designSpecification",
                    linkRole: "Decomposed From",
                    oppositeRole: "Decomposes To"
                },
                {
                    fromType: "useStep",
                    toType: "useStep",
                    linkRole: "Follows",
                    oppositeRole: "Followed By"
                },
                {
                    fromType: "task",
                    toType: "task",
                    linkRole: "Follows",
                    oppositeRole: "Followed By"
                },
                {
                    fromType: "useStep",
                    toType: "VOC_VOB",
                    linkRole: "Follows",
                    oppositeRole: "Followed By"
                },
                {
                    fromType: "function",
                    toType: "function",
                    linkRole: "Related From",
                    oppositeRole: "Related to"
                },
                {
                    fromType: "validationTestCase",
                    toType: ["useStep", "userNeed", "standard"],
                    linkRole: "Validates",
                    oppositeRole: "Validated By"
                },
                {
                    fromType: "validationTestCase",
                    toType: "validationTestCase",
                    linkRole: "Validates",
                    oppositeRole: "Validated By"
                },
                {
                    fromType: "verificationTestCase",
                    toType: ["userNeed", "systemRequirement", "designRequirement", "designSpecification", "designOutput", "standard", "validationTestCase"],
                    linkRole: "Verifies",
                    oppositeRole: "Verified By"
                },
                {
                    fromType: "verificationTestCase",
                    toType: "verificationTestCase",
                    linkRole: "verifies",
                    oppositeRole: "Verified By"
                },
                {
                    fromType: "defect",
                    toType: ["VOC_VOB", "userNeed", "function", "useStep", "systemRequirement", "designRequirement", "designSpecification", "designOutput", "validationTestCase", "verificationTestCase"],
                    linkRole: "Identifies",
                    oppositeRole: "Is Identified By"
                },
                {
                    fromType: "task",
                    toType: ["VOC_VOB", "userNeed", "function", "useStep", "systemRequirement", "designRequirement", "designSpecification", "designOutput", "validationTestCase", "verificationTestCase", "defect", "standard"],
                    linkRole: "Address",
                    oppositeRole: "Addressed By"
                },
                {
                    fromType: ["VOC_VOB", "useStep", "userNeed", "function", "systemRequirement", "designRequirement"],
                    toType: "VOC_VOB",
                    linkRole: "has conflicts with",
                    oppositeRole: "Conflicts with"
                },
                {
                    fromType: ["useStep", "userNeed", "function", "systemRequirement", "designRequirement"],
                    toType: "useStep",
                    linkRole: "has conflicts with",
                    oppositeRole: "Conflicts with"
                },
                {
                    fromType: ["userNeed", "function", "systemRequirement", "designRequirement"],
                    toType: "userNeed",
                    linkRole: "has conflicts with",
                    oppositeRole: "Conflicts with"
                },
                {
                    fromType: ["function", "systemRequirement", "designRequirement"],
                    toType: "function",
                    linkRole: "has conflicts with",
                    oppositeRole: "Conflicts with"
                },
                {
                    fromType: ["systemRequirement", "designRequirement"],
                    toType: "systemRequirement",
                    linkRole: "has conflicts with",
                    oppositeRole: "Conflicts with"
                },
                {
                    fromType: "designRequirement",
                    toType: "designRequirement",
                    linkRole: "has conflicts with",
                    oppositeRole: "Conflicts with"
                },
                {
                    fromType: "standard",
                    toType: "standard",
                    linkRole: "Child",
                    oppositeRole: "Parent"
                },
                {
                    fromType: "textblock",
                    toType: ["standard", "VOC_VOB", "userNeed", "function", "useStep", "systemRequirement", "designRequirement", "designSpecification", "designOutput", "textblock"],
                    linkRole: "Is related to",
                    oppositeRole: "Relates to"
                },
                {
                    fromType: "externalReference",
                    toType: ["verificationTestCase", "validationTestCase"],
                    linkRole: "Is related to",
                    oppositeRole: "Relates to"
                }
            ];
            graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {

                // Adding Custom Shapes in Draw.io
                if (!isLegendAlreadyPresent(graph)) {
                    try {
                        graph.getModel().beginUpdate();
                        var wiTypeArrLength = _wiTypeLocalStorageArray.length;
                        var legendsCountInColoumn = wiTypeArrLength / 4;
                        var legendsCountInColoumn = Math.ceil(legendsCountInColoumn);
                        var legendsHeight = (legendsCountInColoumn * 30);

                        var wiTypeShapeGroup = [];
                        var initial_wt_x = cell.geometry.x;
                        var initial_wt_y = cell.geometry.y - legendsHeight - 60;

                        var wt_x = initial_wt_x;
                        var wt_y = initial_wt_y;

                        for (var wt = 0; wt < _wiTypeLocalStorageArray.length; wt++) {
                            if (wt > 0) {
                                if (((wt % 4) == 0)) {
                                    wt_x = initial_wt_x + 180;
                                    wt_y = initial_wt_y;
                                    initial_wt_x = wt_x;
                                }
                                else {
                                    wt_y = wt_y + 40;
                                }
                            }

                            var wt_rectStyle = "shape=" + _wiTypeLocalStorageArray[wt].shape + ";fillColor=" + _wiTypeLocalStorageArray[wt].colorCode + ";strokeColor=#000000;rounded=0;whiteSpace=wrap;html=1;";
                            var wt_labelText = "";
                            var wt_newRect = graph.insertVertex(graph.getDefaultParent(), null, wt_labelText, wt_x, wt_y, 25, 25, wt_rectStyle);

                            var wt_labelRectStyle = "shape=rect;fillColor=#FFFFFF00;strokeColor=#ffffff00;rounded=0;whiteSpace=wrap;html=1;align=left;";
                            var wt_labelText1 = '<div style="white-space: nowrap; width: 120px;overflow: hidden;text-overflow: ellipsis;">' + _wiTypeLocalStorageArray[wt].title + '</div>';
                            var wt_newText = graph.insertVertex(graph.getDefaultParent(), null, wt_labelText1, wt_x + 30, wt_y, 120, 30, wt_labelRectStyle);

                            wiTypeShapeGroup.push(wt_newRect);
                            wiTypeShapeGroup.push(wt_newText);
                        }
                        let group = graph.groupCells(null, 10, wiTypeShapeGroup);
                        group.setAttribute('customType', 'legend');
                        group.setId('legend-unique');
                        graph.refresh();
                    }
                    finally {
                        graph.getModel().endUpdate();
                    }
                }

                var targetNode = evt.target.nodeName;
                if (targetNode === "rect") {
                    // Check if the cell already has a WI link
                    if (cell && cell.value && cell.value.includes("href")) {
                        menu.addItem("Open WI", null, function () {
                            var match = cell.value.match(/href="([^"]+)"/);
                            if (match) {
                                window.open(match[1], "_blank");
                            }
                        });
                        return; // Stop further menu additions
                    }


                    // Creating custom show dialog popUp
                    var div = document.createElement("div");
                    div.style.padding = "10px";

                    div.innerHTML = `
                        <style>
                        .wiType-dropdown{
                                width: 100%;
                                margin-bottom: 20px;
                                margin-top: 5px;
                                height: 25px;

                        }
                        .form-input{
                                width: 100%;
                                margin-bottom: 10px;
                                margin-top: 5px;
                                height:20px;
                        }
                        </style>
                    <div>
                            <label for="wiType">WorkItem Type:</label>
                              <select id="wiType" class="wiType-dropdown">
                                ${_wiTypeLocalStorageArray.map(item =>
                        `<option value="${item.id}">${item.title}</option>`

                    ).join('')}
                             </select>
                    </div>

                            <div>
                                <label for="wiTitle">WorkItem Title:</label>
                                <input type="text" id="wiTitle" class="form-input" placeholder="Enter Title">
                            </div>

                        `;
                    var cancelButton = mxUtils.button("Cancel", function () {
                        ui.hideDialog();
                    });

                    var createButton = mxUtils.button("Create WorkItem", function () {
                        var wiTitle = document.getElementById("wiTitle").value;
                        let wiType = document.getElementById("wiType").value;
                        ui.hideDialog(); // Hide dialog after creating WI



                        // API request for creating WI
                        var apiUrl = `${APIURL}/workitems`;
                        var wiData = {

                            "data": [
                                {
                                    "type": "workitems",
                                    "attributes": {
                                        "title": wiTitle,
                                        "type": wiType
                                    }
                                }
                            ]
                        };

                        // Find the shape and color based on selected `wiType`
                        var selectedShapeData = _wiTypeLocalStorageArray.find(item => item.id === wiType);
                        var selectedShape = selectedShapeData ? selectedShapeData.shape : "rectangle";
                        var selectedColor = selectedShapeData ? selectedShapeData.colorCode : "#FFFFFF";

                        // Make the AJAX request to create the work item
                        $.ajax({
                            url: apiUrl,
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${BEARERTOKEN}`,
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },

                            data: JSON.stringify(wiData),
                            success: function (response) {
                                const wiId = response.data[0].id.split("/")[1];
                                const wiLink = response.data[0].links.portal;

                                if (cell != null) {
                                    graph.getModel().beginUpdate();
                                    try {
                                        cell.value = `<a href="${wiLink}" target="_blank" data-witype="${wiType}">${wiId}:${wiTitle}</a>`;
                                        cell.style = `shape=${selectedShape};fillColor=${selectedColor};strokeColor=#000000;rounded=0;whiteSpace=wrap;html=1;`;
                                        graph.refresh();
                                    } finally {
                                        graph.getModel().endUpdate();
                                    }
                                }
                            },

                            error: function (error) {
                                console.error("Error creating work item:", error);
                                alert("Failed to create WI. Check console for details.");
                            }
                        });

                    });

                    createButton.style.marginTop = "10px";
                    createButton.style.height = "30px";
                    cancelButton.style.marginLeft = "100px";
                    cancelButton.style.height = "30px";
                    div.appendChild(createButton);
                    div.appendChild(cancelButton);
                    ui.showDialog(div, 300, 180, true, false);

                } else if (targetNode == "path") {

                    var sourceCell = cell.source;
                    var targetCell = cell.target;
                    var sourceWiType = extractWiType(sourceCell);
                    var targetWiType = extractWiType(targetCell);
                    var sourceWiId = extractWiId(sourceCell);
                    var targetWiId = extractWiId(targetCell);
                    if (!sourceCell || !targetCell) {
                        console.error("Source cell or target cell is missing!");
                        alert("Source cell or target cell is missing!")
                        return;
                    }
                    let validLinkRoles = [];
                    linkRoleDataArray.forEach(function (linkRole) {
                        const fromTypes = Array.isArray(linkRole.fromType) ? linkRole.fromType : [linkRole.fromType];
                        const toTypes = Array.isArray(linkRole.toType) ? linkRole.toType : [linkRole.toType];

                        let isValid = false;
                        let useOpposite = false;

                        const isSameType = (fromTypes.length === 1 && toTypes.length === 1 && fromTypes[0] === toTypes[0]);
                        const from = fromTypes[0];
                        const to = toTypes[0];

                        if (isSameType && sourceWiType === targetWiType && sourceWiType === from) {
                            // Same type but check direction manually
                            if (sourceWiId < targetWiId) {
                                isValid = true;
                                useOpposite = true;
                            } else {
                                isValid = true;
                                useOpposite = false;
                            }
                        } else {
                            // Different types or mixed direction
                            if (fromTypes.includes(sourceWiType) && toTypes.includes(targetWiType)) {
                                isValid = true;
                                useOpposite = false;
                            } else if (fromTypes.includes(targetWiType) && toTypes.includes(sourceWiType)) {
                                isValid = true;
                                useOpposite = true;
                            }
                        }

                        if (isValid) {
                            const isSwitched = useOpposite; 
                            validLinkRoles.push({
                                role: useOpposite ? linkRole.oppositeRole : linkRole.linkRole,
                                sourceWiId: isSwitched ? targetWiId : sourceWiId,
                                targetWiId: isSwitched ? sourceWiId : targetWiId
                            });
                        }
                    });


                    // Add roles to the menu
                    if (validLinkRoles.length > 0) {
                        if (validLinkRoles.length > 1) {
                            menu.addItem("Select Link Role", null, null);

                        }

                        validLinkRoles.forEach(function (linkRole) {
                            menu.addItem(linkRole.role, null, function () {
                                graph.getModel().beginUpdate();
                                try {
                                    cell.value = linkRole.role;
                                    graph.refresh();
                                    linkingWorkItem(linkRole.role, linkRole.sourceWiId, linkRole.targetWiId);
                                } finally {
                                    graph.getModel().endUpdate();
                                }
                            });
                        });
                    } else {
                        menu.addItem("No role configured yet", null, function () { });
                    }
                }
                else {
                    menu.addItem("Please click on a shape", null, function () { });
                }
            };
        } else {
            console.error('Editor not found. Ensure this script is loaded in the Draw.io environment.');
        }
    }


    Draw.loadPlugin(function (ui) {
        if (typeof ui !== 'undefined') {
            initializeCustomContextMenu(ui);
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                if (typeof ui !== 'undefined') {
                    initializeCustomContextMenu(ui);
                }
            });
        }
    });

    //Extracting  WorkItem Type From Shapes
    function extractWiType(cell) {
        if (cell && cell.value) {
            const tempElement = document.createElement("div");
            tempElement.innerHTML = cell.value;
            const anchorElement = tempElement.querySelector("a");
            return anchorElement ? anchorElement.getAttribute("data-witype") : null;
        }
        return null;
    }

    // Making AJAX Call For Linking Polarion WorkItem Via RestApi
    function linkingWorkItem(selectedRole, sourceWiId, targetWiId) {
        var apiUrl = `${APIURL}/workitems/${sourceWiId}/linkedworkitems`;
        var wiData = {
            "data": [
                {
                    "type": "linkedworkitems",
                    "attributes": {
                        "role": selectedRole
                    },

                    "relationships": {
                        "workItem": {
                            "data": {
                                "type": "workitems",
                                "id": PROJECTID + "/" + targetWiId
                            }
                        }
                    }
                }
            ]
        };

        $.ajax({
            url: apiUrl,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${BEARERTOKEN}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(wiData),

            success: function (response) {
                console.log(`Linked WorkItem Response is ${response} `);
            },

            error: function (error) {
                console.error("Error creating work item:", error);
            }
        });
    }

    // Extracting WorkItem Id from draw.io shapes
    function extractWiId(cell) {
        if (!cell || !cell.value) return null;
        let value = cell.value;
        if (typeof value !== "string" && value.nodeType === 1) {
            value = value.innerText || value.textContent;
        }
        let match = value.match(/>([^:]+):/);
        return match ? match[1].trim() : null;
    }

    // Map Dynamic color to WorkItem Type
    function getColorForId(id) {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colorCodes[Math.abs(hash) % colorCodes.length];
    }

    // Map Dynamic Shape to WorkItem Type
    function getShapeForId(id) {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return shapeArray[Math.abs(hash) % shapeArray.length];
    }

    function getAllWorkItemTypes() {
        var wiTypes = [];
        var apiUrl = APIURL + "/enumerations/~/workitem-type/~";

        $.ajax({
            url: apiUrl,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${BEARERTOKEN}`,
                "Accept": "application/json"
            },
            success: function (response) {
                var data = response.data.attributes.options;

                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    var title = data[i].name;
                    var iconURL = data[i].iconURL;

                    var shape = getShapeForId(id);
                    var color = getColorForId(id);

                    wiTypes.push({
                        id: id,
                        title: title,
                        iconURL: iconURL,
                        shape: shape,
                        colorCode: color
                    });
                }

                _wiTypeLocalStorageArray = wiTypes;
            }
        });
    }

    // Check if a legend is present already in the draw.io
    function isLegendAlreadyPresent(graph) {
        const model = graph.getModel();
        const cells = model.cells;

        for (let key in cells) {
            const cell = cells[key];
            if (cell) {
                if (cell.id === 'legend-unique') {
                    return true;
                }
                if (cell.getAttribute && cell.getAttribute('customType') === 'legend') {
                    return true;
                }
            }
        }
        return false;
    }

}
