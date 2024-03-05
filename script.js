var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
document.addEventListener("DOMContentLoaded", initialize);
function initialize() {
    return __awaiter(this, void 0, void 0, function () {
        function typeText(index) {
            var text = texts[index].text;
            var currentText = '';
            var charIndex = 0;
            function type() {
                if (charIndex <= text.length) {
                    currentText = text.substring(0, charIndex);
                    h1Element.textContent = currentText;
                    charIndex++;
                    setTimeout(type, 100);
                }
                else {
                    setTimeout(deleteText, 1000);
                }
            }
            function deleteText() {
                if (charIndex >= 0) {
                    currentText = text.substring(0, charIndex);
                    h1Element.textContent = currentText;
                    charIndex--;
                    setTimeout(deleteText, 50);
                }
                else {
                    currentIndex = (currentIndex + 1) % texts.length;
                    setTimeout(typeText, 1000, currentIndex);
                }
            }
            type();
        }
        function blinkCursor() {
            cursorElement.style.visibility = cursorElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
            setTimeout(blinkCursor, 500);
        }
        var h1Element, cursorElement, texts, currentIndex;
        return __generator(this, function (_a) {
            h1Element = document.getElementById("text1");
            cursorElement = document.getElementById("cursor");
            texts = [
                { text: "a software developer.", delay: 2000 },
                { text: "a penetration tester.", delay: 2000 },
                { text: "a back-end developer.", delay: 2000 },
                { text: "an operating system developer.", delay: 2000 }
            ];
            currentIndex = 0;
            typeText(currentIndex);
            blinkCursor();
            return [2 /*return*/];
        });
    });
}
var observer = new IntersectionObserver(observerCallback, { threshold: 0.2 });
document.querySelectorAll('#projects .project').forEach(function (project) { return observer.observe(project); });
function observerCallback(entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}
var lastScrollTop = 0;
window.addEventListener("scroll", handleScroll);
function handleScroll() {
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.querySelector(".header");
    if (currentScrollTop > lastScrollTop) {
        header.classList.add("header-hidden");
    }
    else {
        header.classList.remove("header-hidden");
    }
    lastScrollTop = currentScrollTop;
}
var apiLinks = ["https://api.github.com/users/codezz-ops/repos", "https://api.github.com/users/Nebrix/repos"];
function fetchProjects(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, repos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        headers: {
                            'Accept': 'application/vnd.github+json',
                        },
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    repos = _a.sent();
                    return [2 /*return*/, repos];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var allProjects, _a, _b, selectedProjects, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _a = [[]];
                    return [4 /*yield*/, fetchProjects(apiLinks[0])];
                case 1:
                    _b = [__spreadArray.apply(void 0, _a.concat([(_c.sent()), true]))];
                    return [4 /*yield*/, fetchProjects(apiLinks[1])];
                case 2:
                    allProjects = __spreadArray.apply(void 0, _b.concat([(_c.sent()), true]));
                    selectedProjects = [allProjects[5], allProjects[14], allProjects[9], allProjects[13], allProjects[16], allProjects[15]];
                    populateProjects(selectedProjects);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.error('Error fetching projects:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function populateProjects(projects) {
    var projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(function (project) {
        var projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        var projectTitle = document.createElement('h3');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
        var projectDescription = document.createElement('p');
        projectDescription.classList.add('project-description');
        projectDescription.textContent = project.description;
        var projectLink = document.createElement('a');
        projectLink.classList.add('btn', 'btn-primary');
        projectLink.href = project.url;
        projectLink.target = '_blank';
        projectLink.textContent = 'GitHub Repository';
        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDescription);
        projectDiv.appendChild(projectLink);
        projectsGrid.appendChild(projectDiv);
    });
}
main();