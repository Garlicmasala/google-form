// Store answers globally (simple approach)
const surveyData = JSON.parse(localStorage.getItem('surveyData')) || {};

function saveData(pageData) {
    Object.assign(surveyData, pageData);
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
}

function getSurveyData() {
    return JSON.parse(localStorage.getItem('surveyData')) || {};
}

function populateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const data = getSurveyData();
    
    // Populate form fields with saved data
    form.querySelectorAll('[name]').forEach(element => {
        const name = element.name;
        if (data[name] !== undefined) {
            if (element.type === 'radio' || element.type === 'checkbox') {
                const matching = form.querySelector(`[name="${name}"][value="${data[name]}"]`);
                if (matching) matching.checked = true;
            } else {
                element.value = data[name];
            }
        }
    });
}

function clearSavedData() {
    localStorage.removeItem('surveyData');
}