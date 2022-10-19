const RippleClass = ".ripple,.btn";
const RippleInterval = 700; // in ms
const CollapseAttribute = "data-collapse-toggle";
const SidenavAttribute = "data-sidenav-toggle";
const SidenavClass = "G_Sidenav";
const openClass = "isOpen";
const activeClass = "isActive";
const ArrowHTML = `<i class="fas fa-angle-up arrow"></i>`;
const autoResizeInput = `data-G-auto-resize`;
const SidenavCollapse = {
    Element: ".SidenavCollapse",
    Toggle: ".collapseToggle",
    List: ".collapseList"
};
const AccordionSettings = {
    className: ".G_Accordion",
    item: ".G_Accordion_Item",
    header: ".G_Accordion_Header",
    body: ".G_Accordion_Body"
};
const ModalSettings = {
    className: ".G_Modal",
    toggle: "data-modal-toggle",
    close: "data-modal-close",
};
const ToastSettings = {
    container: ".G_Toast_Container",
    selector: 'data-toast-toggle',
    interval: 'data-toast-interval',
    DefaultTime: 3000,
    type: 'data-toast-type',
    position: 'data-toast-position',
    html: 'data-toast-content',
};

const TabsSettings = {
    tabBar: "data-g-tab-target",
    toggle: 'data-g-tab',
};
const ToolTipSettings = {
    selector: 'data-tooltip-toggle',
    position: 'data-tooltip-position',
    html: 'data-tooltip-content',
};
const SlicedMenuSetting = {
    container: '.G_Sliced-menu',
    outer: '.G_Sliced-Outer-menuList',
    inner: '.G_Sliced-Inner-menuList',
    item: '.G_Sliced-menuItem',
    selector: 'data-G-Sliced-toggle',
};
// PreBuilt Functions
const getSiblings = (TargetNode) => [...TargetNode.parentNode.children].filter((siblings) => siblings !== TargetNode);
function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have (works on IE7)
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
}
const setAttributes = (TargetNode, Attributes) => {
    if (!isElement(TargetNode)) throw new Error(TargetNode + " must be an Html Element");
    if (!(typeof Attributes === "object")) throw new Error(Attributes + " must be HTML attribute Object");

    // Object.assign(TargetNode,Attributes)
    Object.keys(Attributes).forEach(attr => {
        TargetNode.setAttribute(attr, Attributes[attr]);
    });
}
function GenerateId(length) {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function GCollapse(collapse) {
    if (!collapse.classList.contains(openClass)) {
        /** Show the collapse. */
        collapse.classList.add(openClass);
        collapse.style.height = "auto";
        var height = collapse.clientHeight + "px";
        collapse.style.height = "0px";
        setTimeout(() => {
            collapse.style.height = height;
        }, 0);

    } else {
        collapse.style.height = "0px";
        collapse.addEventListener('transitionend', () => {
            collapse.classList.remove(openClass);
            collapse.removeAttribute("style");
        }, {
            once: true
        });
    }
}

document.querySelectorAll(RippleClass).forEach((el) => {
    if (!el.classList.contains("ripple")) el.classList.add("ripple");
    el.addEventListener("click", (e) => {
        const RippleElement = document.createElement("div");
        RippleElement.className = "ripple-effect";
        if (el.hasAttribute("data-ripple-color") && el.getAttribute("data-ripple-color").length > 0)
            RippleElement.style.setProperty("--ripple-background", el.getAttribute("data-ripple-color"));

        el.appendChild(RippleElement);
        e = e.touches ? e.touches[0] : e;
        const r = el.getBoundingClientRect(),
            d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;

        RippleElement.style.cssText = `--s: 0; --o: 1;`;
        RippleElement.offsetTop;
        RippleElement.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left
            }; --y:${e.clientY - r.top};`;
        setTimeout(function () {
            RippleElement.remove();
        }, RippleInterval);
    });
});

document.querySelectorAll(`[${CollapseAttribute}]`).forEach((toggler) => {
    const target = document.querySelectorAll(toggler.getAttribute(CollapseAttribute));
    target.forEach((each) => {

        if (!each.classList.contains('G_Collapse'))
            each.classList.add('G_Collapse');
    });

    toggler.addEventListener("click", () => {
        target.forEach((each) => {
            GCollapse(each)

        });

        (toggler.classList.contains('btn') && toggler.classList.toggle(activeClass))
    });
});

document.querySelectorAll(`[${SidenavAttribute}]`).forEach((toggler) => {

    toggler.addEventListener("click", () => document.querySelector(toggler.getAttribute(SidenavAttribute)).classList.toggle(openClass));
});
Array.from(document.getElementsByClassName(SidenavClass)).forEach((sidenav) => {
    document.addEventListener('mouseup', function (e) {
        if (!sidenav.contains(e.target)) {
            sidenav.classList.remove(openClass);
        }
    });
});

document.querySelectorAll(SidenavCollapse.Element).forEach((Collapse) => {
    Collapse.querySelector(SidenavCollapse.Toggle).insertAdjacentHTML('beforeend', ArrowHTML);
    Collapse.querySelector(SidenavCollapse.Toggle).addEventListener("click", () => {
        Collapse.querySelector(SidenavCollapse.Toggle).classList.toggle(activeClass);
        GCollapse(Collapse.querySelector(SidenavCollapse.List));
    });
});


document.querySelectorAll(AccordionSettings.className).forEach((Accordion) => {
    Accordion.querySelectorAll(AccordionSettings.item).forEach((item) => {

        item.querySelector(AccordionSettings.header).addEventListener("click", () => {
            if (Accordion.hasAttribute("accordion-multiple") && Accordion.getAttribute("accordion-multiple") === "true") {
                item.classList.toggle(openClass);
                item.querySelector(AccordionSettings.header).classList.toggle(activeClass);
                GCollapse(item.querySelector(AccordionSettings.body));
            }
            else {
                item.classList.toggle(openClass);
                item.querySelector(AccordionSettings.header).classList.toggle(activeClass);
                GCollapse(item.querySelector(AccordionSettings.body));
                getSiblings(item).filter(sibling => sibling.classList.contains(openClass)).forEach((sibling) => {
                    sibling.classList.remove(openClass);
                    sibling.querySelector(AccordionSettings.header).classList.remove(activeClass);
                    sibling.querySelector(AccordionSettings.body).style.height = "0px";
                    sibling.querySelector(AccordionSettings.body).addEventListener('transitionend', () => {
                        sibling.querySelector(AccordionSettings.body).classList.remove(openClass);
                        sibling.querySelector(AccordionSettings.body).removeAttribute("style");
                    }, {
                        once: true
                    });
                });
            }
        });
    });

});


document.querySelectorAll(`[${ModalSettings.toggle}]`).forEach((ModalToggle) => {
    const modalId = ModalToggle.getAttribute(ModalSettings.toggle);
    const modal = document.querySelector(modalId);
    const modalBackDrop = modal.parentElement;
    const modalClose = modal.querySelectorAll(`[${ModalSettings.close}]`);

    ModalToggle.addEventListener("click", () => {
        modalBackDrop.classList.toggle(openClass);
        setTimeout(() => {

            modal.classList.toggle(openClass);
        }, 100);
    });
    modalClose.forEach((close) => {
        close.addEventListener("click", () => {
            modal.classList.remove(openClass);
            setTimeout(() => {

                modalBackDrop.classList.remove(openClass);
            }, 800);
        });
    });

    modalBackDrop.addEventListener("mouseup", function (e) {
        if (!modal.contains(e.target)) {
            modal.classList.remove(openClass);
            setTimeout(() => {

                modalBackDrop.classList.remove(openClass);
            }, 800);
        }
    });
});

document.querySelectorAll(`[${ToastSettings.selector}]`).forEach((ToastToggle) => {

    ToastToggle.addEventListener("click", () => {
        if (ToastToggle.getAttribute(ToastSettings.position) === null)
            ToastToggle.setAttribute(ToastSettings.position, "topRight");

        const TargetContainerSelector = `.${ToastSettings.container.slice(1)}.${ToastToggle.getAttribute(ToastSettings.position)}`;
        if (!document.querySelector(TargetContainerSelector)) {
            const container = document.createElement("div");
            container.className = TargetContainerSelector.split(".").join(" ");
            document.body.appendChild(container);
        }
        const ToastContainer = document.querySelector(TargetContainerSelector);

        const Toast = document.createElement("div");
        Toast.classList.add("G_Toast");
        Toast.innerHTML = ToastToggle.getAttribute(ToastSettings.html);
        ToastContainer.appendChild(Toast);
        setTimeout(() => {
            Toast.classList.add(activeClass);
        }, 50);
        if (ToastToggle.getAttribute(ToastSettings.interval)) {
            setTimeout(() => {
                Toast.classList.remove(activeClass);
                setTimeout(() => {
                    Toast.remove();
                    if (ToastContainer.innerHTML.length === 0)
                        ToastContainer.remove();
                }, 1000);
            }, ToastToggle.getAttribute(ToastSettings.interval) + 50);
        }
        else {
            setTimeout(() => {
                Toast.classList.remove(activeClass);
                setTimeout(() => {
                    Toast.remove();
                    if (ToastContainer.innerHTML.length === 0)
                        ToastContainer.remove();

                }, 1000);
            }, ToastSettings.DefaultTime + 50);
        }
    });
});


document.querySelectorAll(`[${TabsSettings.tabBar}]`).forEach((tabBar) => {
    tabBar.querySelectorAll(`[${TabsSettings.toggle}]`).forEach((toggle) => {
        toggle.addEventListener("click", () => {

            toggle.classList.add(activeClass);
            getSiblings(toggle).filter(sibling => sibling.classList.contains(activeClass)).forEach((sibling) => {
                sibling.classList.remove(activeClass);
            });
            const TargetContainer = document.querySelector(tabBar.getAttribute(TabsSettings.tabBar));
            const TargetTab = TargetContainer.querySelector('#' + toggle.getAttribute(TabsSettings.toggle));
            TargetTab.classList.add(openClass);
            getSiblings(TargetTab).filter(sibling => sibling.classList.contains(openClass)).forEach((sibling) => {
                sibling.classList.remove(openClass);
            });


        });
    });

});

document.querySelectorAll(`[${ToolTipSettings.selector}]`).forEach((ToolTipToggle) => {

    ToolTipToggle.addEventListener("click", () => {
        if (ToolTipToggle.getAttribute(ToolTipSettings.position) === null)
            ToolTipToggle.setAttribute(ToolTipSettings.position, "Top");


    });
});

document.querySelectorAll(SlicedMenuSetting.container).forEach((SlicedMenu) => {
    const inner = SlicedMenu.querySelector(SlicedMenuSetting.inner);
    const outer = SlicedMenu.querySelector(SlicedMenuSetting.outer);
    const outerHeight = outer.clientHeight + 'px'
    SlicedMenu.style.height = outerHeight;

    Array.from(outer.querySelectorAll(SlicedMenuSetting.item))
        .filter(toggle => toggle.hasAttribute(SlicedMenuSetting.selector) && toggle.getAttribute(SlicedMenuSetting.selector) !== null)
        .forEach((toggle) => {
            const target = inner.querySelector('#' + toggle.getAttribute(SlicedMenuSetting.selector));

            toggle.insertAdjacentHTML("beforeend", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`)
            toggle.addEventListener("click", () => {
                SlicedMenu.style.height = "auto";

                SlicedMenu.classList.add(openClass);
                target.classList.add(activeClass);

                SlicedMenu.addEventListener('transitionstart', () => {
                    SlicedMenu.style.height = "auto";
                }, {
                    once: true
                });
                SlicedMenu.addEventListener('transitionend', () => {
                    SlicedMenu.style.height = target.clientHeight + 'px';
                }, {
                    once: true
                });
                getSiblings(target).filter(sibling => sibling.classList.contains(activeClass)).forEach((sibling) => {
                    sibling.classList.remove(activeClass);
                });
            });
            const exitBtn = target.firstElementChild.cloneNode(true);
            exitBtn.innerText = toggle.textContent;
            exitBtn.classList.add("exitBtn");
            exitBtn.insertAdjacentHTML("afterbegin", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`);
            target.insertAdjacentElement("afterbegin", exitBtn);
            exitBtn.addEventListener("click", () => {
                SlicedMenu.classList.remove(openClass);
                SlicedMenu.addEventListener('transitionstart', () => {
                    SlicedMenu.style.height = "auto";
                }, {
                    once: true
                });
                SlicedMenu.addEventListener('transitionend', () => {
                    SlicedMenu.style.height = outerHeight;
                }, {
                    once: true
                });
            })
            Array.from(target.parentElement.children).filter(sibling => !sibling.classList.contains(activeClass)).forEach((sibling) => {
                sibling.classList.add(activeClass);
            });
        });

    document.addEventListener('mouseup', function (e) {
        if (!SlicedMenu.contains(e.target)) {
            SlicedMenu.classList.remove(openClass);
            SlicedMenu.addEventListener('transitionstart', () => {
                SlicedMenu.style.height = "auto";
            }, {
                once: true
            });
            SlicedMenu.addEventListener('transitionend', () => {
                SlicedMenu.style.height = outerHeight;
            }, {
                once: true
            });
        }
    });
})
// clipboard
const copyToClipboard = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
};

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const copyIOS = (id) => {
    const text = document.getElementById(id).innerText;

    if (!navigator.clipboard) {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.fontSize = "20px";
        document.body.appendChild(textarea);

        const range = document.createRange();
        range.selectNodeContents(textarea);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textarea.setSelectionRange(0, 999999);

        document.execCommand("copy");

        document.body.removeChild(textarea);
    }

    navigator.clipboard.writeText(text);
};

const copyTextById = (id) => {
    if (isIOS) {
        return copyIOS(id);
    }
    copyToClipboard(id);
    console.log("Content Copied from Non-form elements");
};

// window.copyTextById = copyTextById;
document.querySelectorAll("[data-g-clipboard-target]").forEach((clipboardToggle) => {
    clipboardToggle.addEventListener("click", () => {
        const target = clipboardToggle.getAttribute("data-g-clipboard-target");
        const TempTxt = clipboardToggle.textContent;
        const targetElement = document.getElementById(target);
        if (
            targetElement.tagName.toLowerCase() === "input" ||
            targetElement.tagName.toLowerCase() === "textarea"
        ) {
            targetElement.select();
            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successfully" : "unsuccessfully";
                console.log("Content Copied " + msg);
            } catch (err) {
                console.log("Oops, unable to copy");
            }
        } else {
            copyTextById(target);
        }
        clipboardToggle.innerText = "Copied !!";
        setTimeout(() => {
            clipboardToggle.innerText = TempTxt;
        }, 1500);
    });
});

document.querySelectorAll(`.G_Form-textarea`).forEach((element) => {
    element.style.boxSizing = "border-box";
    var offset = element.offsetHeight - element.clientHeight;
    if (!element.hasAttribute(autoResizeInput))
        element.setAttribute(autoResizeInput, "true")

    element.addEventListener("input", function (event) {
        if (element.getAttribute(autoResizeInput) === "true") {
            event.target.style.maxHeight = "auto";
            event.target.style.height = event.target.scrollHeight + offset + "px";
        }
    });
});

document
    .querySelectorAll("input[type=color].G_Form-color")
    .forEach((picker) => {
        const targetLabel = document.querySelector('label[for="' + picker.id + '"]') || (() => {
            const targetLabel = document.createElement('label');
            targetLabel.classList.add('G_Form-colorLabel');
            picker.insertAdjacentElement("beforebegin", targetLabel);
            targetLabel.appendChild(picker);
            return targetLabel;
        })(),
            codeArea = document.createElement("span");
        codeArea.innerHTML = picker.value;
        targetLabel.appendChild(codeArea);

        picker.addEventListener("input", () => {
            codeArea.innerHTML = picker.value;
        });
    });
// Range
document.querySelectorAll("input[type=range].G_Form-range").forEach((range) => {
    const targetLabel = document.querySelector('label[for="' + range.id + '"]') || (() => {
        const targetLabel = document.createElement('label');
        targetLabel.classList.add('G_Form-rangeLabel');
        range.insertAdjacentElement("beforebegin", targetLabel);
        targetLabel.appendChild(range);
        return targetLabel;
    })(),
        valueArea = document.createElement("span");
    valueArea.innerHTML = range.value;
    targetLabel.appendChild(valueArea);
    function updateValue() {
        valueArea.innerHTML = range.value;
        targetLabel.appendChild(valueArea);
    }
    range.addEventListener("input", updateValue);
});
// Select
document.querySelectorAll("select.G_Form-select").forEach((select) => {
    // Assign Id to select
    const ID = GenerateId(6);

    select.setAttribute("data-g-select-label-by", "G_Form-select_" + ID);

    // Create Parent Wrapper
    const wrapper = (() => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("G_Form-selectWrapper");
        select.insertAdjacentElement("beforebegin", wrapper);
        wrapper.appendChild(select);
        return wrapper;
    })();

    wrapper.style.minWidth = select.clientWidth + "px";
    select.classList.add('G_Form-selectInitialized');
    // Create a Input Toggle button
    const input = document.createElement("input");
    setAttributes(input, {
        type: "text",
        class: "G_Form-SelectToggle",
        id: `G_Form-selectToggle_${ID}`,
        role: "listbox",
        "aria-popup": "false",
        readonly: "true",
        value: select.options[select.selectedIndex].value
    });
    wrapper.insertAdjacentElement("beforeend", input);
    // Add Icon to input element
    wrapper.insertAdjacentHTML(
        "beforeend",
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
      </svg>`
    );

    // Create DropDown
    const DropDown = document.createElement("div"),
        DropDownList = document.createElement("ul");
    DropDown.classList.add("G_SelectDropdown");
    DropDown.id = `G_SelectDropdown_${ID}`;
    DropDown.appendChild(DropDownList);
    wrapper.appendChild(DropDown);


    Array.from(select.options).forEach((option) => {
        const DropItem = document.createElement("li");
        DropItem.className = "G_SelectDropdown-item";
        DropItem.innerText = option.innerText;
        DropItem.ariaSelected = "false";
        DropItem.setAttribute("value", option.value);

        if (option.value === select.options[select.selectedIndex].value) {
            DropItem.ariaSelected = "true";
            DropItem.classList.add(activeClass);
        }
        DropDownList.appendChild(DropItem);
    });

    // Toggle DropDown
    input.addEventListener("click", () => {
        input.classList.toggle(activeClass);
        input.setAttribute(
            'aria-popup',
            input.getAttribute('aria-popup') === 'true'
                ? 'false'
                : 'true'
        );
        DropDown.classList.toggle(openClass);
    });
    document.addEventListener("mouseup", function (e) {
        if (!input.contains(e.target) && !DropDown.contains(e.target)) {
            input.classList.remove(activeClass);
            input.setAttribute("aria-popup", "false");
            DropDown.classList.remove(openClass);
        }
    });
    DropDownList.childNodes.forEach((item, index) => {
        item.addEventListener("click", () => {
            item.classList.add(activeClass);
            item.ariaSelected = "true";
            getSiblings(item).forEach((i) => {
                i.classList.remove(activeClass);
                i.ariaSelected = "false";
            });
            select.selectedIndex = index;
            select.options[index].setAttribute("selected", "");

            getSiblings(select.options[index]).forEach((i) => {
                i.removeAttribute("selected");
            });

            input.classList.remove(activeClass);
            input.setAttribute('aria-popup', 'false');
            DropDown.classList.remove(openClass);
            input.value = select.options[select.selectedIndex].innerText;

        });
    });
    select.addEventListener("change", () => {
        DropDownList.childNodes[select.selectedIndex].classList.add(activeClass);
        DropDownList.childNodes[select.selectedIndex].ariaSelected = "true";
        getSiblings(DropDownList.childNodes[select.selectedIndex]).forEach((i) => {
            i.classList.remove(activeClass);
            i.ariaSelected = "false";
        });
        input.value = select.options[select.selectedIndex].innerText;
    })

});
