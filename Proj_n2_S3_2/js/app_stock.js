document.addEventListener("DOMContentLoaded", () => {
    const apiBaseUrl = "http://localhost/api_crud/index.php?url=api/produto";

    const idInput = document.getElementById("id");
    const nameInput = document.getElementById("nome");
    const priceInput = document.getElementById("preco");
    const quantityInput = document.getElementById("quantidade");

    const deleteBtn = document.querySelector(".btn.delete");
    const confirmBtn = document.querySelector(".btn.confirm");
    const searchBtn = document.querySelector(".btn.search");
    const uploadBtn = document.querySelector(".btn.upload");

    uploadBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim(); // ID do produto para ser atualizado
        const productData = {
            nome: nameInput.value.trim(),
            descricao: "Descrição padrão",
            preco: parseFloat(priceInput.value.trim()),
            quantidade_estoque: parseInt(quantityInput.value.trim()),
            id_fornecedor: 1, // Exemplo: ID do fornecedor fixo
        };
    
        // Validação dos dados
        if (!productId) {
            alert("Por favor, insira o ID do produto para atualizar.");
            return;
        }
    
        if (!productData.nome || isNaN(productData.preco) || isNaN(productData.quantidade_estoque)) {
            alert("Preencha todos os campos corretamente!");
            return;
        }
    
        try {
            // Enviar requisição PUT para atualizar o produto
            const response = await fetch(`${apiBaseUrl}/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao atualizar produto: ${errorText}`);
            }
    
            const message = await response.json();
            console.log("Resposta da API:", message);
    
            alert(message.status === "success" ? "Produto atualizado com sucesso!" : "Erro ao atualizar produto.");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            alert(error.message);
        }
    });

    // Buscar Produto
    searchBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim();
        if (!productId) {
            alert("Por favor, insira o ID do produto para buscar.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/${productId}`, { method: "GET" });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro na API: ${response.status}. ${errorText}`);
            }
            const product = await response.json();
console.log("Produto recebido:", product);

// Acesse a propriedade correta
const data = product.information;
nameInput.value = data.nome || "Nome não encontrado";
priceInput.value = data.preco || 0;
quantityInput.value = data.quantidade_estoque || 0;

            alert("Produto encontrado!");
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            alert(error.message);
        }
    });

    // Confirmar Produto
    confirmBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim();
        const productData = {
            nome: nameInput.value.trim(),
            descricao: "Descrição padrão",
            preco: parseFloat(priceInput.value.trim()),
            quantidade_estoque: parseInt(quantityInput.value.trim()),
            id_fornecedor: 1,
        };
    
        // Verificando os dados antes de enviar
        console.log("Dados enviados:", productData);
    
        if (!productData.nome || !productData.preco || !productData.quantidade_estoque) {
            alert("Preencha todos os campos!");
            return;
        }
    
        try {
            const method = productId ? "PUT" : "POST";
            const url = productId ? `${apiBaseUrl}/${productId}` : apiBaseUrl;
    
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao salvar: ${errorText}`);
            }
    
            const message = await response.json();
            console.log("Resposta da API:", message);
    
            alert(message.status === "success" ? "Produto salvo com sucesso!" : "Erro ao salvar produto.");
            if (!productId) idInput.value = ""; // Limpa o campo ID em caso de inserção
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert(error.message);
        }
    });
    
    // Deletar Produto
    deleteBtn.addEventListener("click", async () => {
        const productId = idInput.value.trim();
        if (!productId) {
            alert("Por favor, insira o ID do produto para deletar.");
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/${productId}`, { method: "DELETE" });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao deletar: ${errorText}`);
            }
            alert("Produto deletado com sucesso!");
            idInput.value = "";
            nameInput.value = "";
            priceInput.value = "";
            quantityInput.value = "";
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            alert(error.message);
        }
    });
});