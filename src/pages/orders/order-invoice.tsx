import { Page, Text, View, Document, StyleSheet, pdf, PDFViewer, Image } from '@react-pdf/renderer';
import { IOrders } from './orders.interface';

const demoOrder: IOrders[] = [
    {
        _id: '123',
        fullName: 'John Doe',
        phoneNumber: '1234567890',
        address: '123 Main St',
        deliveryArea: 'Dhaka',
        note: 'Please handle with care',
        products: [
            {
                id: '1',
                title: 'Product 1',
                price: 100,
                regularPrice: 120,
                image: 'https://via.placeholder.com/150',
                qty: 2
            },
            {
                id: '2',
                title: 'Product 2',
                price: 200,
                regularPrice: 220,
                image: 'https://via.placeholder.com/150',
                qty: 1
            }
        ],
        status: 'Pending',
        total: '400',
        deliveryCharge: '20',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        date: new Date().toLocaleDateString()
    }
]
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 16,
    },
    body: {
        fontSize: 12,
    }
});

// Create Document Component
// eslint-disable-next-line react-refresh/only-export-components
const MyDocument = ({ orders }: { orders: IOrders[] }) => (
    <Document>
        {
            orders.map((order) => {
                return (
                    <Page size="A4" style={styles.page}>
                        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 30 }}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',

                                    alignItems: 'center'
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 700
                                        }}
                                    >Order Invoice</Text>
                                </View>
                                <View>
                                    <Image
                                        style={{ width: 160, height: 60 }}
                                        src="/full_logo.png"
                                    />
                                </View>

                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 20
                                }}
                            >
                                <View>
                                    <Text style={styles.title}>From</Text>
                                    <Text style={styles.body}>Waazir Fasion Ltd</Text>
                                    <Text style={styles.body}>Dhaka 1203</Text>
                                </View>
                                <View style={styles.body}>
                                    <Text>Invoice No# : {order?.id}</Text>
                                    <Text>Date: {order.date}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 20
                                }}
                            >
                                <View>
                                    <Text style={styles.title}>Bill To</Text>
                                    <View style={styles.body}>
                                        <Text>{order.fullName}</Text>
                                        <Text>{order.phoneNumber}</Text>
                                        <Text>{order.address}</Text>
                                        <Text>{order.deliveryArea}</Text>
                                    </View>
                                    {/* <Text >{order.fullName}</Text>
                        <Text>{order.phoneNumber}</Text>
                        <Text>{order.address}</Text>
                        <Text>{order.deliveryArea}</Text> */}
                                </View>
                                <View>
                                    <Text style={styles.title}>Ship To</Text>
                                    <View style={styles.body}>
                                        <Text>{order.fullName}</Text>
                                        <Text>{order.phoneNumber}</Text>
                                        <Text>{order.address}</Text>
                                        <Text>{order.deliveryArea}</Text>
                                    </View>

                                </View>
                            </View>
                            <View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 20,

                                        border: '1px solid black',
                                        padding: 3,
                                        ...styles.body,
                                        backgroundColor: '#f0f0f0'
                                    }}
                                >
                                    <Text>QTY</Text>
                                    <Text>Product</Text>
                                    <Text>Unit Price</Text>
                                    <Text>Amount</Text>
                                </View>
                                {
                                    order.products.map(product => (
                                        <View
                                            key={product.id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                // marginTop: 20,
                                                border: '1px solid black',
                                                // borderBottom: 0,
                                                borderTop: 0,
                                                ...styles.body,
                                                padding: 3
                                            }}
                                        >
                                            <Text>{product.qty}</Text>
                                            <Text>{product.title}</Text>
                                            <Text>{product.price}</Text>
                                            <Text>{product.price * product.qty}</Text>
                                        </View>
                                    ))
                                }

                                <View
                                    style={{
                                        textAlign: 'right',
                                        display: 'flex',
                                        marginTop: 20,
                                        ...styles.body,
                                        padding: 3

                                    }}
                                >
                                    <Text>Total: {parseInt(order.total) - parseInt(order.deliveryCharge || '0')}</Text>
                                    <Text>Delivery Charge: {order.deliveryCharge}</Text>
                                    {/* <Text>Grand Total: {parseInt(order.total) + parseInt(order.deliveryCharge)}</Text> */}
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: 20,
                                        border: '1px solid black',
                                        flexDirection: 'row',
                                        fontWeight: 'bold',
                                        padding: 3,
                                    }}>
                                        <Text>Total</Text>
                                        <Text>{parseInt(order.total)}</Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </Page>
                )
            })
        }
    </Document >
);




export const generateOrderInvoice = async (orders: IOrders[]) => {
    const blob = await pdf(<MyDocument orders={orders} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const orderDate = new Date(orders?.[0].createdAt).toLocaleDateString();
    const name = orders?.[0]?.fullName.split(' ').join('-') + '-' + orders?.[0].id + '-' + orderDate;
    link.href = url;
    link.download = `${name}.pdf`;
    link.click();
};


const OrderInvoice = () => {
    return <PDFViewer
        width={"100%"}
        height={1000}
    >
        <MyDocument
            orders={demoOrder}
        />
    </PDFViewer>
}

export default OrderInvoice;