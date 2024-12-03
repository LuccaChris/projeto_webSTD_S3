document.addEventListener("DOMContentLoaded", () => {
    const apiBaseUrl = "http://localhost/api_crud/index.php?url=api/produto";

    // Selecionando os elementos do DOM
    const idInput = document.querySelector(".form-row input[placeholder='ID']");
    const nameInput = document.querySelector(".form-row input[placeholder='Nome']");
    const priceInput = document.querySelector(".form-row input[placeholder='preço']");
    const quantityInput = document.querySelector(".form-row input[placeholder='quantidade']");
    const deleteBtn = document.querySelector(".btn.delete");
    const confirmBtn = document.querySelector(".btn.confirm");
    const searchBtn = document.querySelector(".btn.search");
    const uploadBtn = document.querySelector(".btn.upload");

    // Função para buscar produto
    searchBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim();
        if (!productId) {
            alert("Por favor, insira o ID do produto para buscar.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}${productId}`, {
                method: "GET",
            });
            if (response.ok) {
                const product = await response.json();
                nameInput.value = product.nome;
                priceInput.value = product.preco;
                quantityInput.value = product.quantidade_estoque;
                alert("Produto encontrado!");
            } else {
                throw new Error("Produto não encontrado.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });

    // Função para criar ou atualizar produto
    confirmBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim();
        const productData = {
            nome: nameInput.value.trim(),
            descricao: "Descrição padrão", // Adicione um campo de descrição no seu formulário, se necessário
            preco: parseFloat(priceInput.value.trim()),
            quantidade_estoque: parseInt(quantityInput.value.trim()),
            id_fornecedor: 1, // Use o ID real do fornecedor
        };

        if (!productData.nome || !productData.preco || !productData.quantidade_estoque) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const method = productId ? "PUT" : "POST";
            const url = productId ? `${apiBaseUrl}${productId}` : apiBaseUrl;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                const message = await response.json();
                alert(message);
                if (!productId) idInput.value = ""; // Limpa o campo ID em caso de inserção
            } else {
                throw new Error("Erro ao salvar o produto.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });

    // Função para deletar produto
    deleteBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim();
        if (!productId) {
            alert("Por favor, insira o ID do produto para deletar.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}${productId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Produto deletado com sucesso!");
                idInput.value = "";
                nameInput.value = "";
                priceInput.value = "";
                quantityInput.value = "";
            } else {
                throw new Error("Erro ao deletar o produto.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });

    // Função para listar produtos (opcional)
    uploadBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(apiBaseUrl, { method: "GET" });
            if (response.ok) {
                const products = await response.json();
                console.log(products); // Mostra os produtos no console
                alert("Produtos carregados! Confira o console.");
            } else {
                throw new Error("Erro ao carregar os produtos.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });

    
});
