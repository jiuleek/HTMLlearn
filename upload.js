let firstUpload = true;

function handleFiles(event) {
    const fileList = event.target.files;
    const insideUp = document.querySelector('.insideup');

    // 如果是第一次上传，清空 insideUp 区域的原始内容
    if (firstUpload) {
        insideUp.innerHTML = '';
        firstUpload = false;
    }

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            img.title = file.name;
            img.addEventListener('dblclick', () => {
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                modal.style.zIndex = '1000';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.addEventListener('click', () => {
                    modal.remove();
                });

                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.style.maxWidth = '90%';
                modalImg.style.maxHeight = '90%';
                modalImg.style.objectFit = 'contain';
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
            });

            const fileName = document.createElement('span');
            fileName.textContent = file.name;

            const deleteButton = document.createElement('div');
            deleteButton.textContent = '删除';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                imageContainer.remove();
            });

            imageContainer.appendChild(img);
            imageContainer.appendChild(fileName);
            imageContainer.appendChild(deleteButton);
            insideUp.appendChild(imageContainer);
        };
        reader.readAsDataURL(file);
    }
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFiles);



