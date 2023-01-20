<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body>
	<h2>Math Courses in Reed College</h2>
	<table border="1">
	  <tr bgcolor="green">
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Title</th>
            <th>Building</th>
            <th>Room</th>
	  </tr>
	  <!-- iterate over the math courses -->
	  <xsl:for-each select="root/course[subj='MATH']">
	    <tr>
	      <td><xsl:value-of select="subj"/></td>
	      <td><xsl:value-of select="instructor"/></td>
	      <td><xsl:value-of select="title"/></td>
	      <td><xsl:value-of select="place/building"/></td>
	      <td><xsl:value-of select="place/room"/></td>
	    </tr>
	  </xsl:for-each>
	</table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>