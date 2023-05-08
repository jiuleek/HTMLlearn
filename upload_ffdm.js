document.addEventListener('DOMContentLoaded', () => {
    const divs = ['d0', 'd1', 'd2', 'd3'];

    divs.forEach((divId) => {
        const div = document.getElementById(divId);
        const innerDiv = div.querySelector('.inner-box');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        const originalContent = innerDiv.innerHTML;

        div.appendChild(fileInput);

        const clickHandler = () => {
            fileInput.click();
        };

        div.addEventListener('click', clickHandler);

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    innerDiv.innerHTML = '';

                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = file.name;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.position = 'absolute';
                    img.style.top = '0';
                    img.style.left = '0';

                    innerDiv.appendChild(img);
                    event.target.value = '';

                    // 显示文件名
                    const fileNameDiv = document.createElement('div');
                    fileNameDiv.innerText = file.name;
                    fileNameDiv.style.position = 'absolute';
                    fileNameDiv.style.bottom = '0';
                    fileNameDiv.style.left = '0';
                    fileNameDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    fileNameDiv.style.padding = '2px 5px';
                    fileNameDiv.style.fontSize = '14px';

                    innerDiv.appendChild(fileNameDiv);

                    // 移除点击事件处理程序，禁止再次上传
                    div.removeEventListener('click', clickHandler);

                    // 添加双击事件，用于放大图片
                    img.addEventListener('dblclick', () => {
                        const overlay = document.createElement('div');
                        overlay.style.position = 'fixed';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100%';
                        overlay.style.height = '100%';
                        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                        overlay.style.zIndex = '1000';
                        overlay.style.display = 'flex';
                        overlay.style.justifyContent = 'center';
                        overlay.style.alignItems = 'center';

                        const enlargedImg = document.createElement('img');
                        enlargedImg.src = img.src;
                        enlargedImg.style.maxWidth = '80%';
                        enlargedImg.style.maxHeight = '80%';

                        overlay.appendChild(enlargedImg);
                        document.body.appendChild(overlay);

                        // 点击遮罩层关闭放大的图片
                        overlay.addEventListener('click', () => {
                            document.body.removeChild(overlay);
                        });
                    });

                    // 鼠标移入删除图片功能
                    const deleteBtn = document.createElement('button');
                    deleteBtn.innerText = '删除';
                    deleteBtn.style.backgroundColor = "red";
                    deleteBtn.style.color = "white";
                    deleteBtn.style.borderRadius = "50%";
                    deleteBtn.style.cursor = "pointer";
                    deleteBtn.style.position = 'absolute';
                    deleteBtn.style.top = '0';
                    deleteBtn.style.right = '0';
                    deleteBtn.style.display = 'none';

                    innerDiv.appendChild(deleteBtn);

                    innerDiv.addEventListener('mouseover', () => {
                        deleteBtn.style.display = 'block';
                    });

                    innerDiv.addEventListener('mouseout', () => {
                        deleteBtn.style.display = 'none';
                    });

                    deleteBtn.addEventListener('click', (event) => {
                        event.stopPropagation();
                        innerDiv.removeChild(img);
                        innerDiv.removeChild(deleteBtn);
                        innerDiv.innerHTML = originalContent;

                        // 恢复点击事件处理程序，允许再次上传
                        div.addEventListener('click', clickHandler);
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    });
});












