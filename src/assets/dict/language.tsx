import { getStorage, setStorage } from "@/core/publicFn";
import { languageKeyList } from '@/assets/dict/pageLanguage.ts'
import { useState, useEffect } from 'react'
import React from 'react';
const languageList: Record<string, Record<string, string>> = {
    "nav.cart": {
        "EN": "Cart",
        "简": "购物车",
        "繁": "購物車",
        "JA": "カート",
        "TH": "ตะกร้า",
        "FR": "Panier",
        "DE": "Warenkorb",
        "ES": "Carrito",
        "IT": "Carrello"
    },
    "nav.language": {
        "EN": "Language",
        "简": "语言",
        "繁": "語言",
        "JA": "言語",
        "TH": "ภาษา",
        "FR": "Langue",
        "DE": "Sprache",
        "ES": "Idioma",
        "IT": "Lingua"
    },
    "nav.secondary.menu": {
        "EN": "Menu",
        "简": "点单",
        "繁": "點餐",
        "JA": "メニュー",
        "TH": "เมนู",
        "FR": "Menu",
        "DE": "Speisekarte",
        "ES": "Menú",
        "IT": "Menu"
    },
    "nav.secondary.visitUs": {
        "EN": "Visit us",
        "简": "到店",
        "繁": "到店",
        "JA": "店舗情報",
        "TH": "ข้อมูลร้าน",
        "FR": "Nous trouver",
        "DE": "Anfahrt",
        "ES": "Visítanos",
        "IT": "Vienici a trovare"
    },
    "store.service.dineIn": {
        "EN": "Dine-in",
        "简": "堂食",
        "繁": "堂食",
        "JA": "店内飲食",
        "TH": "ทานที่ร้าน",
        "FR": "Sur place",
        "DE": "Vor Ort essen",
        "ES": "Comer aquí",
        "IT": "Consumazione sul posto"
    },
    "store.service.takeaway": {
        "EN": "Takeaway",
        "简": "自取",
        "繁": "自取",
        "JA": "テイクアウト",
        "TH": "รับกลับ",
        "FR": "À emporter",
        "DE": "Zum Mitnehmen",
        "ES": "Para llevar",
        "IT": "Da asporto"
    },
    "store.service.delivery": {
        "EN": "Delivery",
        "简": "外送",
        "繁": "外送",
        "JA": "デリバリー",
        "TH": "จัดส่ง",
        "FR": "Livraison",
        "DE": "Lieferung",
        "ES": "Entrega",
        "IT": "Consegna"
    },
    "store.service.driveThru": {
        "EN": "Drive-thru",
        "简": "免下车取餐",
        "繁": "免下車取餐",
        "JA": "ドライブスルー",
        "TH": "ไดรฟ์ทรู",
        "FR": "Drive",
        "DE": "Drive-in",
        "ES": "Autoservicio",
        "IT": "Drive-through"
    },
    "store.parking.free": {
        "EN": "Free parking",
        "简": "免费停车",
        "繁": "免費停車",
        "JA": "無料駐車場",
        "TH": "ที่จอดรถฟรี",
        "FR": "Parking gratuit",
        "DE": "Kostenlose Parkplätze",
        "ES": "Estacionamiento gratis",
        "IT": "Parcheggio gratuito"
    },
    "store.parking.paid": {
        "EN": "Paid parking",
        "简": "付费停车",
        "繁": "付費停車",
        "JA": "有料駐車場",
        "TH": "ที่จอดรถแบบเสียเงิน",
        "FR": "Parking payant",
        "DE": "Kostenpflichtige Parkplätze",
        "ES": "Estacionamiento de pago",
        "IT": "Parcheggio a pagamento"
    },
    "store.payment.cash": {
        "EN": "Cash",
        "简": "现金",
        "繁": "現金",
        "JA": "現金",
        "TH": "เงินสด",
        "FR": "Espèces",
        "DE": "Barzahlung",
        "ES": "Efectivo",
        "IT": "Contanti"
    },
    "store.payment.creditCard": {
        "EN": "Credit card",
        "简": "信用卡",
        "繁": "信用卡",
        "JA": "クレジットカード",
        "TH": "บัตรเครดิต",
        "FR": "Carte de crédit",
        "DE": "Kreditkarte",
        "ES": "Tarjeta de crédito",
        "IT": "Carta di credito"
    },
    "store.payment.debitCard": {
        "EN": "Debit card",
        "简": "借记卡",
        "繁": "簽帳金融卡",
        "JA": "デビットカード",
        "TH": "บัตรเดบิต",
        "FR": "Carte de débit",
        "DE": "Debitkarte",
        "ES": "Tarjeta de débito",
        "IT": "Carta di debito"
    },
    "store.payment.applePay": {
        "EN": "Apple Pay",
        "简": "Apple Pay",
        "繁": "Apple Pay",
        "JA": "Apple Pay",
        "TH": "Apple Pay",
        "FR": "Apple Pay",
        "DE": "Apple Pay",
        "ES": "Apple Pay",
        "IT": "Apple Pay"
    },
    "store.payment.googlePay": {
        "EN": "Google Pay",
        "简": "Google Pay",
        "繁": "Google Pay",
        "JA": "Google Pay",
        "TH": "Google Pay",
        "FR": "Google Pay",
        "DE": "Google Pay",
        "ES": "Google Pay",
        "IT": "Google Pay"
    },
    "store.payment.paypal": {
        "EN": "PayPal",
        "简": "PayPal",
        "繁": "PayPal",
        "JA": "PayPal",
        "TH": "PayPal",
        "FR": "PayPal",
        "DE": "PayPal",
        "ES": "PayPal",
        "IT": "PayPal"
    },
    "store.payment.alipay": {
        "EN": "Alipay",
        "简": "支付宝",
        "繁": "支付寶",
        "JA": "Alipay",
        "TH": "Alipay",
        "FR": "Alipay",
        "DE": "Alipay",
        "ES": "Alipay",
        "IT": "Alipay"
    },
    "store.payment.weChatPay": {
        "EN": "WeChat Pay",
        "简": "微信支付",
        "繁": "微信支付",
        "JA": "WeChat Pay",
        "TH": "WeChat Pay",
        "FR": "WeChat Pay",
        "DE": "WeChat Pay",
        "ES": "WeChat Pay",
        "IT": "WeChat Pay"
    },
    "store.payment.unionPay": {
        "EN": "UnionPay",
        "简": "银联",
        "繁": "銀聯",
        "JA": "UnionPay",
        "TH": "UnionPay",
        "FR": "UnionPay",
        "DE": "UnionPay",
        "ES": "UnionPay",
        "IT": "UnionPay"
    },
    "store.payment.octopus": {
        "EN": "Octopus",
        "简": "八达通",
        "繁": "八達通",
        "JA": "Octopus",
        "TH": "Octopus",
        "FR": "Octopus",
        "DE": "Octopus",
        "ES": "Octopus",
        "IT": "Octopus"
    },
    "store.payment.payMe": {
        "EN": "PayMe by HSBC",
        "简": "PayMe by HSBC",
        "繁": "PayMe by HSBC",
        "JA": "PayMe by HSBC",
        "TH": "PayMe by HSBC",
        "FR": "PayMe by HSBC",
        "DE": "PayMe by HSBC",
        "ES": "PayMe by HSBC",
        "IT": "PayMe by HSBC"
    },
    "store.payment.payPay": {
        "EN": "PayPay",
        "简": "PayPay",
        "繁": "PayPay",
        "JA": "PayPay",
        "TH": "PayPay",
        "FR": "PayPay",
        "DE": "PayPay",
        "ES": "PayPay",
        "IT": "PayPay"
    },
    "store.payment.suica": {
        "EN": "Suica",
        "简": "Suica",
        "繁": "Suica",
        "JA": "Suica",
        "TH": "Suica",
        "FR": "Suica",
        "DE": "Suica",
        "ES": "Suica",
        "IT": "Suica"
    },
    "store.payment.pasmo": {
        "EN": "PASMO",
        "简": "PASMO",
        "繁": "PASMO",
        "JA": "PASMO",
        "TH": "PASMO",
        "FR": "PASMO",
        "DE": "PASMO",
        "ES": "PASMO",
        "IT": "PASMO"
    },
    "store.payment.rakutenPay": {
        "EN": "Rakuten Pay",
        "简": "Rakuten Pay",
        "繁": "Rakuten Pay",
        "JA": "Rakuten Pay",
        "TH": "Rakuten Pay",
        "FR": "Rakuten Pay",
        "DE": "Rakuten Pay",
        "ES": "Rakuten Pay",
        "IT": "Rakuten Pay"
    },
    "store.payment.dBarai": {
        "EN": "d払い",
        "简": "d払い",
        "繁": "d払い",
        "JA": "d払い",
        "TH": "d払い",
        "FR": "d払い",
        "DE": "d払い",
        "ES": "d払い",
        "IT": "d払い"
    },
    "store.payment.jcb": {
        "EN": "JCB",
        "简": "JCB",
        "繁": "JCB",
        "JA": "JCB",
        "TH": "JCB",
        "FR": "JCB",
        "DE": "JCB",
        "ES": "JCB",
        "IT": "JCB"
    },
    "store.payment.payNow": {
        "EN": "PayNow",
        "简": "PayNow",
        "繁": "PayNow",
        "JA": "PayNow",
        "TH": "PayNow",
        "FR": "PayNow",
        "DE": "PayNow",
        "ES": "PayNow",
        "IT": "PayNow"
    },
    "store.payment.payLah": {
        "EN": "PayLah!",
        "简": "PayLah!",
        "繁": "PayLah!",
        "JA": "PayLah!",
        "TH": "PayLah!",
        "FR": "PayLah!",
        "DE": "PayLah!",
        "ES": "PayLah!",
        "IT": "PayLah!"
    },
    "store.payment.grabPay": {
        "EN": "GrabPay",
        "简": "GrabPay",
        "繁": "GrabPay",
        "JA": "GrabPay",
        "TH": "GrabPay",
        "FR": "GrabPay",
        "DE": "GrabPay",
        "ES": "GrabPay",
        "IT": "GrabPay"
    },
    "store.payment.promptPay": {
        "EN": "PromptPay",
        "简": "PromptPay",
        "繁": "PromptPay",
        "JA": "PromptPay",
        "TH": "PromptPay",
        "FR": "PromptPay",
        "DE": "PromptPay",
        "ES": "PromptPay",
        "IT": "PromptPay"
    },
    "store.payment.trueMoneyWallet": {
        "EN": "TrueMoney Wallet",
        "简": "TrueMoney Wallet",
        "繁": "TrueMoney Wallet",
        "JA": "TrueMoney Wallet",
        "TH": "TrueMoney Wallet",
        "FR": "TrueMoney Wallet",
        "DE": "TrueMoney Wallet",
        "ES": "TrueMoney Wallet",
        "IT": "TrueMoney Wallet"
    },
    "store.payment.venmo": {
        "EN": "Venmo",
        "简": "Venmo",
        "繁": "Venmo",
        "JA": "Venmo",
        "TH": "Venmo",
        "FR": "Venmo",
        "DE": "Venmo",
        "ES": "Venmo",
        "IT": "Venmo"
    },
    "store.payment.cashApp": {
        "EN": "Cash App",
        "简": "Cash App",
        "繁": "Cash App",
        "JA": "Cash App",
        "TH": "Cash App",
        "FR": "Cash App",
        "DE": "Cash App",
        "ES": "Cash App",
        "IT": "Cash App"
    },
    "store.payment.bancontact": {
        "EN": "Bancontact",
        "简": "Bancontact",
        "繁": "Bancontact",
        "JA": "Bancontact",
        "TH": "Bancontact",
        "FR": "Bancontact",
        "DE": "Bancontact",
        "ES": "Bancontact",
        "IT": "Bancontact"
    },
    "store.payment.blik": {
        "EN": "BLIK",
        "简": "BLIK",
        "繁": "BLIK",
        "JA": "BLIK",
        "TH": "BLIK",
        "FR": "BLIK",
        "DE": "BLIK",
        "ES": "BLIK",
        "IT": "BLIK"
    },
    "store.payment.mbWay": {
        "EN": "MB Way",
        "简": "MB Way",
        "繁": "MB Way",
        "JA": "MB Way",
        "TH": "MB Way",
        "FR": "MB Way",
        "DE": "MB Way",
        "ES": "MB Way",
        "IT": "MB Way"
    },
    "store.payment.multibanco": {
        "EN": "Multibanco",
        "简": "Multibanco",
        "繁": "Multibanco",
        "JA": "Multibanco",
        "TH": "Multibanco",
        "FR": "Multibanco",
        "DE": "Multibanco",
        "ES": "Multibanco",
        "IT": "Multibanco"
    },
    "store.payment.mobilePay": {
        "EN": "MobilePay",
        "简": "MobilePay",
        "繁": "MobilePay",
        "JA": "MobilePay",
        "TH": "MobilePay",
        "FR": "MobilePay",
        "DE": "MobilePay",
        "ES": "MobilePay",
        "IT": "MobilePay"
    },
    "store.payment.twint": {
        "EN": "TWINT",
        "简": "TWINT",
        "繁": "TWINT",
        "JA": "TWINT",
        "TH": "TWINT",
        "FR": "TWINT",
        "DE": "TWINT",
        "ES": "TWINT",
        "IT": "TWINT"
    },
    "store.payment.vipps": {
        "EN": "Vipps",
        "简": "Vipps",
        "繁": "Vipps",
        "JA": "Vipps",
        "TH": "Vipps",
        "FR": "Vipps",
        "DE": "Vipps",
        "ES": "Vipps",
        "IT": "Vipps"
    },
    "footer.social.facebook": {
        "EN": "Facebook",
        "简": "Facebook",
        "繁": "Facebook",
        "JA": "Facebook",
        "TH": "Facebook",
        "FR": "Facebook",
        "DE": "Facebook",
        "ES": "Facebook",
        "IT": "Facebook"
    },
    "footer.social.instagram": {
        "EN": "Instagram",
        "简": "Instagram",
        "繁": "Instagram",
        "JA": "Instagram",
        "TH": "Instagram",
        "FR": "Instagram",
        "DE": "Instagram",
        "ES": "Instagram",
        "IT": "Instagram"
    },
    "footer.social.youtube": {
        "EN": "YouTube",
        "简": "YouTube",
        "繁": "YouTube",
        "JA": "YouTube",
        "TH": "YouTube",
        "FR": "YouTube",
        "DE": "YouTube",
        "ES": "YouTube",
        "IT": "YouTube"
    },
    "footer.social.tiktok": {
        "EN": "TikTok",
        "简": "TikTok",
        "繁": "TikTok",
        "JA": "TikTok",
        "TH": "TikTok",
        "FR": "TikTok",
        "DE": "TikTok",
        "ES": "TikTok",
        "IT": "TikTok"
    },
    "footer.social.x": {
        "EN": "X",
        "简": "X",
        "繁": "X",
        "JA": "X",
        "TH": "X",
        "FR": "X",
        "DE": "X",
        "ES": "X",
        "IT": "X"
    },
    "footer.social.xiaohongshu": {
        "EN": "Xiaohongshu",
        "简": "小红书",
        "繁": "小紅書",
        "JA": "Xiaohongshu",
        "TH": "Xiaohongshu",
        "FR": "Xiaohongshu",
        "DE": "Xiaohongshu",
        "ES": "Xiaohongshu",
        "IT": "Xiaohongshu"
    },
    "footer.social.douyin": {
        "EN": "d",
        "简": "抖音",
        "繁": "抖音",
        "JA": "Douyin",
        "TH": "Douyin",
        "FR": "Douyin",
        "DE": "Douyin",
        "ES": "Douyin",
        "IT": "Douyin"
    },
    "footer.social.whatsapp": {
        "EN": "WhatsApp",
        "简": "WhatsApp",
        "繁": "WhatsApp",
        "JA": "WhatsApp",
        "TH": "WhatsApp",
        "FR": "WhatsApp",
        "DE": "WhatsApp",
        "ES": "WhatsApp",
        "IT": "WhatsApp"
    },
    "footer.copyright": {
        "EN": "© {year} {storeName}",
        "简": "© {year} {storeName}",
        "繁": "© {year} {storeName}",
        "JA": "© {year} {storeName}",
        "TH": "© {year} {storeName}",
        "FR": "© {year} {storeName}",
        "DE": "© {year} {storeName}",
        "ES": "© {year} {storeName}",
        "IT": "© {year} {storeName}"
    },
    "footer.poweredBy": {
        "EN": "Powered by {BiajiKit}",
        "简": "由 {BiajiKit} 提供支持",
        "繁": "由 {BiajiKit} 提供支援",
        "JA": "{BiajiKit} により提供",
        "TH": "ขับเคลื่อนโดย {BiajiKit}",
        "FR": "Propulsé par {BiajiKit}",
        "DE": "Powered by {BiajiKit}",
        "ES": "Con tecnología de {BiajiKit}",
        "IT": "Realizzato con {BiajiKit}"
    },
    "cart.tableNumber": {
        "EN": "Table number",
        "简": "桌号",
        "繁": "桌號",
        "JA": "テーブル番号",
        "TH": "หมายเลขโต๊ะ",
        "FR": "Numéro de table",
        "DE": "Tischnummer",
        "ES": "Número de mesa",
        "IT": "Numero del tavolo"
    },
    "cart.note": {
        "EN": "Note",
        "简": "备注",
        "繁": "備註",
        "JA": "備考",
        "TH": "หมายเหตุ",
        "FR": "Remarque",
        "DE": "Hinweis",
        "ES": "Nota",
        "IT": "Nota"
    },
    "cart.specialRequests": {
        "EN": "Any allergies or special requests?",
        "简": "有过敏或特殊要求吗？",
        "繁": "有過敏或特殊要求嗎？",
        "JA": "アレルギーやご要望はありますか？",
        "TH": "มีอาการแพ้หรือคำขอพิเศษไหม？",
        "FR": "Avez-vous des allergies ou des demandes particulières ?",
        "DE": "Haben Sie Allergien oder besondere Wünsche?",
        "ES": "¿Tienes alergias o alguna petición especial?",
        "IT": "Hai allergie o richieste speciali?"
    },
    "cart.subtotal": {
        "EN": "Subtotal",
        "简": "小计",
        "繁": "小計",
        "JA": "小計",
        "TH": "ยอดรวมย่อย",
        "FR": "Sous-total",
        "DE": "Zwischensumme",
        "ES": "Subtotal",
        "IT": "Subtotale"
    },
    "cart.discount": {
        "EN": "Discount",
        "简": "优惠",
        "繁": "優惠",
        "JA": "割引",
        "TH": "ส่วนลด",
        "FR": "Remise",
        "DE": "Rabatt",
        "ES": "Descuento",
        "IT": "Sconto"
    },
    "cart.total": {
        "EN": "Total",
        "简": "总计",
        "繁": "總計",
        "JA": "合計",
        "TH": "ยอดรวม",
        "FR": "Total",
        "DE": "Gesamt",
        "ES": "Total",
        "IT": "Totale"
    },
    "cart.placeOrder": {
        "EN": "Place order",
        "简": "下单",
        "繁": "下單",
        "JA": "注文する",
        "TH": "สั่งซื้อ",
        "FR": "Passer commande",
        "DE": "Bestellung aufgeben",
        "ES": "Realizar pedido",
        "IT": "Invia ordine"
    },
    "order.sending": {
        "EN": "Sending order…",
        "简": "正在提交订单…",
        "繁": "正在送出訂單…",
        "JA": "注文を送信中…",
        "TH": "กำลังส่งคำสั่งซื้อ…",
        "FR": "Envoi de la commande…",
        "DE": "Bestellung wird gesendet…",
        "ES": "Enviando pedido…",
        "IT": "Invio dell’ordine…"
    },
    "order.placed": {
        "EN": "Order placed",
        "简": "下单成功",
        "繁": "下單成功",
        "JA": "注文が完了しました",
        "TH": "สั่งซื้อสำเร็จ",
        "FR": "Commande passée",
        "DE": "Bestellung aufgegeben",
        "ES": "Pedido realizado",
        "IT": "Ordine effettuato"
    },
    "order.number": {
        "EN": "Order #",
        "简": "订单号",
        "繁": "訂單號碼",
        "JA": "注文番号",
        "TH": "หมายเลขคำสั่งซื้อ",
        "FR": "N° de commande",
        "DE": "Bestellnummer",
        "ES": "N.º de pedido",
        "IT": "N. ordine"
    },
    "order.table": {
        "EN": "Table",
        "简": "桌号",
        "繁": "桌號",
        "JA": "テーブル",
        "TH": "โต๊ะ",
        "FR": "Table",
        "DE": "Tisch",
        "ES": "Mesa",
        "IT": "Tavolo"
    },
    "order.total": {
        "EN": "Total",
        "简": "总计",
        "繁": "總計",
        "JA": "合計",
        "TH": "ยอดรวม",
        "FR": "Total",
        "DE": "Gesamt",
        "ES": "Total",
        "IT": "Totale"
    },
    "order.placedAt": {
        "EN": "Placed at",
        "简": "下单时间",
        "繁": "下單時間",
        "JA": "注文日時",
        "TH": "เวลาที่สั่ง",
        "FR": "Passée à",
        "DE": "Aufgegeben um",
        "ES": "Realizado a las",
        "IT": "Effettuato alle"
    },
    "order.sentToRestaurant": {
        "EN": "Your order has been sent to the restaurant.",
        "简": "订单已发送至餐厅。",
        "繁": "訂單已送出至餐廳。",
        "JA": "ご注文は店舗に送信されました。",
        "TH": "ส่งคำสั่งซื้อของคุณไปยังร้านอาหารแล้ว",
        "FR": "Votre commande a été envoyée au restaurant.",
        "DE": "Ihre Bestellung wurde an das Restaurant gesendet.",
        "ES": "Tu pedido se ha enviado al restaurante.",
        "IT": "Il tuo ordine è stato inviato al ristorante."
    },
    "order.viewOrders": {
        "EN": "View orders",
        "简": "查看订单",
        "繁": "查看訂單",
        "JA": "注文を見る",
        "TH": "ดูคำสั่งซื้อ",
        "FR": "Voir les commandes",
        "DE": "Bestellungen anzeigen",
        "ES": "Ver pedidos",
        "IT": "Vedi ordini"
    },
    "order.addMore": {
        "EN": "Add more",
        "简": "继续加点",
        "繁": "繼續加點",
        "JA": "さらに追加",
        "TH": "เพิ่มรายการ",
        "FR": "Ajouter plus",
        "DE": "Mehr hinzufügen",
        "ES": "Añadir más",
        "IT": "Aggiungi altro"
    },
    "order.placedCount": {
        "EN": "{count} order placed",
        "简": "已提交 {count} 个订单",
        "繁": "已提交 {count} 筆訂單",
        "JA": "{count} 件の注文が完了しました",
        "TH": "สั่งซื้อสำเร็จ {count} รายการ",
        "FR": "{count} commande passée",
        "DE": "{count} Bestellung aufgegeben",
        "ES": "{count} pedido realizado",
        "IT": "{count} ordine effettuato"
    },
    "order.tableNumberValue": {
        "EN": "Table {tableNumber}",
        "简": "桌号 {tableNumber}",
        "繁": "桌號 {tableNumber}",
        "JA": "テーブル {tableNumber}",
        "TH": "โต๊ะ {tableNumber}",
        "FR": "Table {tableNumber}",
        "DE": "Tisch {tableNumber}",
        "ES": "Mesa {tableNumber}",
        "IT": "Tavolo {tableNumber}"
    },
    "order.view": {
        "EN": "View",
        "简": "查看",
        "繁": "查看",
        "JA": "表示",
        "TH": "ดู",
        "FR": "Voir",
        "DE": "Anzeigen",
        "ES": "Ver",
        "IT": "Visualizza"
    },
    "order.orderMore": {
        "EN": "Order more",
        "简": "继续加点",
        "繁": "繼續加點",
        "JA": "さらに注文",
        "TH": "สั่งเพิ่ม",
        "FR": "Commander plus",
        "DE": "Mehr bestellen",
        "ES": "Pedir más",
        "IT": "Ordina altro"
    }
}

// 语言类型
type LangKey = (typeof languageKeyList)[number]['key'];

// 当前语言
let currentLang: LangKey = (getStorage('lang') as LangKey) || 'EN';

// 订阅器
const listeners: (() => void)[] = [];

// 初始化语言
export function initLang(): void {
    const local = getStorage('lang') as LangKey | null;
    if (local) currentLang = local;
}

// 设置语言
export function setLang(lang: LangKey): void {
    currentLang = lang;
    setStorage('lang', lang);
    listeners.forEach(fn => fn());
}

export function useLanguage() {
    const [, setTick] = useState(0);

    useEffect(() => {
        initLang();
        const update = () => setTick(t => t + 1);
        listeners.push(update);

        return () => {
            const idx = listeners.indexOf(update);
            if (idx > -1) listeners.splice(idx, 1);
        };
    }, []);

    const currentLangInfo =
        languageKeyList.find(item => item.key === currentLang)
        ?? languageKeyList[0];

    const t = (
        key: string,
        params?: Record<string, string | React.ReactNode>
    ): React.ReactNode => {
        const entry = languageList[key] ?? {};
        const text = entry[currentLangInfo.abbreviation] ?? '';

        if (!params) return text;

        const parts: React.ReactNode[] = [];
        const regex = /\{(\w+)\}/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            const [fullMatch, paramKey] = match;
            const start = match.index;

            if (start > lastIndex) {
                parts.push(text.slice(lastIndex, start));
            }

            // 用 React.createElement 代替 JSX
            parts.push(
                React.createElement(React.Fragment, { key: start }, params[paramKey] ?? fullMatch)
            );

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return React.createElement(React.Fragment, null, ...parts);
    };

    return {
        t,
        lang: currentLangInfo.key,
        abbreviation: currentLangInfo.abbreviation,
        langName: currentLangInfo.name,
        setLang,
    };
}