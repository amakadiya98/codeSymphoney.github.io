document.addEventListener("DOMContentLoaded", () => {
    //Consultation
    const bookConsultationForm = document.getElementById('bookConsultationForm');
    const consultToast = document.getElementById('consult-toast');
    const consultToastHeader = document.getElementsByClassName('consult-toast-header');
    const consultToastHText = document.getElementsByClassName('toast-success-text');
    const consultToastBText = document.getElementsByClassName('toast-body-text');
    const consultLoader = document.getElementsByClassName('consultation-loader');
    const bookConsultBtn = document.getElementById('bookConsultationBtn');
    const cosultModal = document.getElementById('bookModal');
    let consultationModal = null
    if (cosultModal) {
        consultationModal = new bootstrap.Modal(cosultModal, {
            keyboard: false
        })
    }

    if (bookConsultationForm) {
        bookConsultationForm.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const firstName = bookConsultationForm.elements['firstName'].value;
            const lastName = bookConsultationForm.elements['lastName'].value;
            const email = bookConsultationForm.elements['email'].value;
            const phone = bookConsultationForm.elements['phone'].value;
            const time = bookConsultationForm.elements['time'].value;
            const date = bookConsultationForm.elements['date'].value;
            const message = bookConsultationForm.elements['message'].value.trim();
    
            let payload = {
                firstName,
                lastName,
                email,
                phone,
                time,
                date,
                message
            }
    
            bookConsultBtn.style = "display:none;"
            consultLoader[0].style = "display:inline-block;margin-left:10px"
            const options = {
                url: 'https://codesymphony.in/api/book/consultation',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: payload
            };
    
            try {
                const response = await axios(options)
                const { success } = response.data;
    
                bookConsultBtn.style = "display:block;"
                consultLoader[0].style = "display:none;"
                consultationModal.hide()
                if (success) {
                    consultToastHeader[0].style = "background-color:#76d275"
                    consultToastHText[0].innerHTML = "Consultation Booked"
                    consultToastBText[0].innerHTML = "Thanks! We will contact you soon."
    
                    const toast = new bootstrap.Toast(consultToast)
                    toast.show()
                }
            } catch(err) {
                bookConsultBtn.style = "display:block;"
                consultLoader[0].style = "display:none;"
                consultationModal.hide()
                consultToastHeader[0].style = "background-color:#ba000d"
                consultToastHText[0].innerHTML = "Consultation Failed"
                consultToastBText[0].innerHTML = err.message
    
                const toast = new bootstrap.Toast(consultToast)
                toast.show()
            }
        });
    }


    //Career
    const careerForm = document.getElementById('careerForm');
    const careerToast = document.getElementById('career-toast');
    const careerToastHeader = document.getElementsByClassName('career-toast-header');
    const crToastHText = document.getElementsByClassName('cr-toast-header-text');
    const crToastBText = document.getElementsByClassName('cr-toast-body-text');
    const crLoader = document.getElementsByClassName('cr-loader');
    const crSubmitBtn = document.getElementById('cr-submit-btn');

    if (careerForm) {
        careerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const firstName = careerForm.elements['firstName'].value;
            const lastName = careerForm.elements['lastName'].value;
            const email = careerForm.elements['email'].value;
            const phone = careerForm.elements['phone'].value;
            const position = careerForm.elements['position'].value;
            const cvLink = careerForm.elements['cvLink'].value;
    
            let payload = {
                firstName,
                lastName,
                email,
                phone,
                position,
                cvLink
            }
    
            crSubmitBtn.style = "display:none;"
            crLoader[0].style = "display:block;"
            const options = {
                url: 'https://codesymphony.in/api/career/submit',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: payload
            };
    
            try {
                const response = await axios(options)
                const { success } = response.data;
    
                crSubmitBtn.style = "display:block;"
                crLoader[0].style = "display:none;"
                if (success) {
                    careerToastHeader[0].style = "background-color:#76d275"
                    crToastHText[0].innerHTML = "Applied Successfully"
                    crToastBText[0].innerHTML = "Thanks! Our team will contact you soon."
    
                    const toast = new bootstrap.Toast(careerToast)
                    toast.show()
                }
            } catch(err) {
                crSubmitBtn.style = "display:block;"
                crLoader[0].style = "display:none;"
                careerToastHeader[0].style = "background-color:#ba000d"
                crToastHText[0].innerHTML = "Failed To Apply"
                crToastBText[0].innerHTML = err.message
    
                const toast = new bootstrap.Toast(careerToast)
                toast.show()
            }
        });
    }
});