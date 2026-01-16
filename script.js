// Aplikasi Katalog Produk Mini - JavaScript
class ProductCatalog {
    constructor() {
        this.products = [];
        this.editMode = false;
        this.currentEditId = null;
        this.selectedCategory = '';
        this.searchQuery = '';
        this.sortBy = 'newest';
        
        // Data contoh produk
        this.sampleProducts = [
            {
                id: 1,
                name: "Laptop Gaming Pro",
                description: "Laptop gaming dengan prosesor i7, RAM 16GB, dan GPU RTX 3060 untuk pengalaman gaming terbaik.",
                price: 18500000,
                stock: 8,
                category: "Elektronik",
                rating: 5,
                createdAt: new Date('2023-10-15')
            },
            {
                id: 2,
                name: "Smartphone Flagship",
                description: "Smartphone dengan kamera 108MP, baterai 5000mAh, dan layar AMOLED 120Hz.",
                price: 12999000,
                stock: 15,
                category: "Elektronik",
                rating: 4,
                createdAt: new Date('2023-11-20')
            },
            {
                id: 3,
                name: "Kemeja Formal Premium",
                description: "Kemeja formal pria dengan bahan katun oxford premium, nyaman untuk acara formal.",
                price: 450000,
                stock: 25,
                category: "Pakaian",
                rating: 5,
                createdAt: new Date('2023-09-10')
            },
            {
                id: 4,
                name: "Buku Pemrograman JavaScript",
                description: "Buku lengkap tentang JavaScript modern, ES6+, dan framework populer.",
                price: 275000,
                stock: 12,
                category: "Buku",
                rating: 4,
                createdAt: new Date('2023-08-05')
            },
            {
                id: 5,
                name: "Kopi Arabika Specialty",
                description: "Kopi arabika premium dari lereng gunung, proses natural, rasa buah-buahan.",
                price: 125000,
                stock: 40,
                category: "Makanan",
                rating: 5,
                createdAt: new Date('2023-12-01')
            },
            {
                id: 6,
                name: "Sepatu Running Premium",
                description: "Sepatu lari dengan teknologi cushioning terbaru untuk kenyamanan maksimal.",
                price: 850000,
                stock: 18,
                category: "Olahraga",
                rating: 4,
                createdAt: new Date('2023-10-30')
            }
        ];
        
        this.init();
    }
    
    init() {
        this.loadProducts();
        this.bindEvents();
        this.renderProducts();
        this.updateStats();
    }
    
    loadProducts() {
        const storedProducts = localStorage.getItem('productCatalog');
        if (storedProducts) {
            this.products = JSON.parse(storedProducts).map(p => ({
                ...p,
                createdAt: new Date(p.createdAt)
            }));
        } else {
            this.products = [...this.sampleProducts];
            this.saveProducts();
        }
    }
    
    saveProducts() {
        localStorage.setItem('productCatalog', JSON.stringify(this.products));
    }
    
    bindEvents() {
        // Form submission
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });
        
        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.cancelEdit();
        });
        
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderProducts();
        });
        
        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.renderProducts();
        });
        
        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderProducts();
        });
        
        // Clear data button
        document.getElementById('clearDataBtn').addEventListener('click', () => {
            this.showConfirmation(
                'Hapus Semua Data',
                'Apakah Anda yakin ingin menghapus semua data produk? Tindakan ini tidak dapat dibatalkan.',
                () => this.clearAllData()
            );
        });
        
        // Load sample data button
        document.getElementById('loadSampleBtn').addEventListener('click', () => {
            this.showConfirmation(
                'Muat Data Contoh',
                'Apakah Anda yakin ingin memuat data contoh? Data saat ini akan digantikan.',
                () => this.loadSampleData()
            );
        });
        
        // Add first product button
        document.getElementById('addFirstProductBtn').addEventListener('click', () => {
            document.querySelector('.sidebar').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('productName').focus();
        });
        
        // Modal buttons
        document.getElementById('modalCancel').addEventListener('click', () => {
            this.hideModal();
        });
        
        document.getElementById('modalConfirm').addEventListener('click', () => {
            if (this.modalCallback) {
                this.modalCallback();
                this.modalCallback = null;
            }
            this.hideModal();
        });
        
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.hideModal();
        });
        
        // Toast close button
        document.querySelector('.toast-close').addEventListener('click', () => {
            this.hideToast();
        });
    }
    
    getNextId() {
        return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }
    
    saveProduct() {
        const id = this.editMode ? this.currentEditId : this.getNextId();
        const productData = {
            id: id,
            name: document.getElementById('productName').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
            price: parseInt(document.getElementById('productPrice').value),
            stock: parseInt(document.getElementById('productStock').value),
            category: document.getElementById('productCategory').value,
            rating: parseInt(document.getElementById('productRating').value),
            createdAt: this.editMode 
                ? this.products.find(p => p.id === id)?.createdAt || new Date()
                : new Date()
        };
        
        // Validasi
        if (!this.validateProduct(productData)) return;
        
        if (this.editMode) {
            const index = this.products.findIndex(p => p.id === id);
            if (index !== -1) {
                this.products[index] = productData;
                this.showNotification(`Produk "${productData.name}" berhasil diperbarui`, 'success');
            }
            this.cancelEdit();
        } else {
            this.products.push(productData);
            this.showNotification(`Produk "${productData.name}" berhasil ditambahkan`, 'success');
        }
        
        this.saveProducts();
        this.renderProducts();
        this.updateStats();
        this.resetForm();
    }
    
    validateProduct(product) {
        if (!product.name || !product.description || !product.category) {
            this.showNotification('Harap lengkapi semua field yang diperlukan', 'error');
            return false;
        }
        
        if (product.price < 0 || product.stock < 0) {
            this.showNotification('Harga dan stok tidak boleh negatif', 'error');
            return false;
        }
        
        if (product.price > 1000000000) {
            this.showNotification('Harga terlalu besar', 'error');
            return false;
        }
        
        if (product.description.length > 200) {
            this.showNotification('Deskripsi maksimal 200 karakter', 'error');
            return false;
        }
        
        return true;
    }
    
    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;
        
        this.editMode = true;
        this.currentEditId = id;
        
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productRating').value = product.rating;
        
        document.getElementById('formActionText').textContent = 'Edit Produk';
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-save"></i><span>Perbarui Produk</span>';
        document.getElementById('cancelBtn').style.display = 'flex';
        
        document.querySelector('.sidebar').scrollIntoView({ behavior: 'smooth' });
        
        this.showNotification(`Mengedit produk: ${product.name}`, 'info');
    }
    
    deleteProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;
        
        this.showConfirmation(
            'Hapus Produk',
            `Apakah Anda yakin ingin menghapus produk "${product.name}"?`,
            () => {
                this.products = this.products.filter(p => p.id !== id);
                this.saveProducts();
                this.renderProducts();
                this.updateStats();
                this.showNotification(`Produk "${product.name}" berhasil dihapus`, 'error');
            }
        );
    }
    
    cancelEdit() {
        this.editMode = false;
        this.currentEditId = null;
        this.resetForm();
        this.showNotification('Mode edit dibatalkan', 'info');
    }
    
    resetForm() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('formActionText').textContent = 'Tambah Produk Baru';
        document.getElementById('submitBtn').innerHTML = '<i class="fas fa-plus"></i><span>Tambah Produk</span>';
        document.getElementById('cancelBtn').style.display = 'none';
    }
    
    getFilteredAndSortedProducts() {
        let filtered = this.products;
        
        // Filter berdasarkan kategori
        if (this.selectedCategory) {
            filtered = filtered.filter(p => p.category === this.selectedCategory);
        }
        
        // Filter berdasarkan pencarian
        if (this.searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(this.searchQuery) ||
                p.description.toLowerCase().includes(this.searchQuery) ||
                p.category.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Sorting
        switch (this.sortBy) {
            case 'newest':
                filtered.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'oldest':
                filtered.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        return filtered;
    }
    
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const emptyState = document.getElementById('emptyState');
        const filteredProducts = this.getFilteredAndSortedProducts();
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '';
            emptyState.classList.add('active');
            return;
        }
        
        emptyState.classList.remove('active');
        
        const productsHTML = filteredProducts.map(product => {
            const stockStatus = product.stock > 0 ? 'in-stock' : 'out-of-stock';
            const stockText = product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis';
            const ratingStars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
            const formattedPrice = product.price.toLocaleString('id-ID');
            const date = product.createdAt.toLocaleDateString('id-ID');
            
            return `
                <div class="product-card">
                    <div class="product-header">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                    </div>
                    <div class="product-body">
                        <div class="product-price">Rp ${formattedPrice}<span> / unit</span></div>
                        <div class="product-meta">
                            <span class="product-stock ${stockStatus}">
                                <i class="fas fa-${stockStatus === 'in-stock' ? 'check-circle' : 'times-circle'}"></i>
                                ${stockText}
                            </span>
                            <span class="product-rating">
                                <i class="fas fa-star"></i>
                                ${product.rating.toFixed(1)} (${ratingStars})
                            </span>
                        </div>
                        <div class="product-date">
                            <small><i class="far fa-calendar-alt"></i> Ditambahkan: ${date}</small>
                        </div>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary edit-product" data-id="${product.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-product" data-id="${product.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        productsGrid.innerHTML = productsHTML;
        
        // Tambah event listeners untuk tombol edit dan hapus
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                this.editProduct(id);
            });
        });
        
        document.querySelectorAll('.delete-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                this.deleteProduct(id);
            });
        });
    }
    
    updateStats() {
        const totalProducts = this.products.length;
        const inStockProducts = this.products.filter(p => p.stock > 0).length;
        
        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('inStockProducts').textContent = inStockProducts;
        document.getElementById('storageCount').textContent = totalProducts;
    }
    
    clearAllData() {
        this.products = [];
        this.saveProducts();
        this.renderProducts();
        this.updateStats();
        this.showNotification('Semua data produk telah dihapus', 'error');
    }
    
    loadSampleData() {
        this.products = [...this.sampleProducts];
        this.saveProducts();
        this.renderProducts();
        this.updateStats();
        this.showNotification('Data contoh berhasil dimuat', 'success');
    }
    
    showNotification(message, type = 'success') {
        const toast = document.getElementById('notification');
        const icon = toast.querySelector('i');
        const messageEl = toast.querySelector('.toast-message');
        
        // Set icon berdasarkan type
        switch(type) {
            case 'success':
                icon.className = 'fas fa-check-circle';
                break;
            case 'error':
                icon.className = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                icon.className = 'fas fa-exclamation-triangle';
                break;
            case 'info':
                icon.className = 'fas fa-info-circle';
                break;
        }
        
        messageEl.textContent = message;
        toast.className = `notification-toast ${type} show`;
        
        // Auto hide setelah 4 detik
        setTimeout(() => {
            this.hideToast();
        }, 4000);
    }
    
    hideToast() {
        const toast = document.getElementById('notification');
        toast.classList.remove('show');
    }
    
    showConfirmation(title, message, callback) {
        const modal = document.getElementById('confirmationModal');
        const modalTitle = modal.querySelector('.modal-header h3');
        const modalMessage = document.getElementById('modalMessage');
        
        modalTitle.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${title}`;
        modalMessage.textContent = message;
        this.modalCallback = callback;
        
        modal.classList.add('active');
    }
    
    hideModal() {
        const modal = document.getElementById('confirmationModal');
        modal.classList.remove('active');
        this.modalCallback = null;
    }
    
    getCategoryIcon(category) {
        const icons = {
            'Elektronik': 'fa-laptop',
            'Pakaian': 'fa-tshirt',
            'Makanan': 'fa-utensils',
            'Buku': 'fa-book',
            'Rumah': 'fa-home',
            'Olahraga': 'fa-dumbbell',
            'Kecantikan': 'fa-spa',
            'Lainnya': 'fa-box'
        };
        return icons[category] || 'fa-box';
    }
}

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    new ProductCatalog();
});
