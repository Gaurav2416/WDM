import org.w3c.dom.*;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.InputStream;
import java.io.FileInputStream;

class XPATH {
      public void part(Document d) throws XPathExpressionException {
        // expression to get titles in math
        String expressionPart1 = "root/course[subj='MATH' and place/building='LIB' and place/room='204']/title";
        XPathFactory xpathFactory = XPathFactory.newInstance();
        XPath xpath = xpathFactory.newXPath();
        NodeList result = (NodeList) xpath.evaluate(expressionPart1, d, XPathConstants.NODESET);
        System.out.println(
                "******************************************Part1**********************************************");
        for (int i = 0; i < result.getLength(); i++) {
            Element title = (Element) result.item(i);
            System.out.println("Title = " + title.getTextContent());
        }
        System.out.println(
                "******************************************Part2**********************************************");
        // expression to get instructor in math
        String expressionPart2 = "root/course[subj='MATH' and crse='412']/instructor ";
        NodeList result2 = (NodeList) xpath.evaluate(expressionPart2, d, XPathConstants.NODESET);
        for (int i = 0; i < result2.getLength(); i++) {
            Element instructor = (Element) result2.item(i);
            System.out.println("Instructor = " + instructor.getTextContent());
        }
        System.out.println(
                "******************************************Part3**********************************************");
        // expression to get Wieting title courses
        String expressionPart3 = "root/course[instructor='Wieting']/title";
        NodeList result3 = (NodeList) xpath.evaluate(expressionPart3, d, XPathConstants.NODESET);
        for (int i = 0; i < result3.getLength(); i++) {
            Element title = (Element) result3.item(i);
            System.out.println("Title = " + title.getTextContent());
        }
    }

    public static void main(String[] args) throws Exception {
        String dir = System.getProperty("user.dir");
        InputStream in = new FileInputStream(dir + "/reed.xml");
        DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = builderFactory.newDocumentBuilder();
        // parse the doc to read
        Document xmlDocument = builder.parse(in);
        // class object
        XPATH t = new XPATH();
        // method call
        t.part(xmlDocument);
    }
}