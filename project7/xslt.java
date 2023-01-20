import javax.xml.parsers.*;
import org.w3c.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import java.io.*;

class XSLT {
    public static void main(String argv[]) throws Exception {
        // inherit the table created in the xsl file
        File stylesheet = new File("./math.xsl");
        // read the xml file and store in the variable
        File xmlfile = new File("./reed.xml");
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document document = db.parse(xmlfile);
        StreamSource stylesource = new StreamSource(stylesheet);
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = tf.newTransformer(stylesource);
        DOMSource source = new DOMSource(document);
        // Stream the output result into the file
        StreamResult result = new StreamResult(new File("./output.xhtml"));
        transformer.transform(source, result);
    }
}
