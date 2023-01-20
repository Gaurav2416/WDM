<html>
<body>
{
for $x in doc("reed.xml")//course
			where $x/subj="MATH" and $x/place/building="LIB" and $x/place/room="204"
			return <course> 
						{ $x/title }
						{ $x/instructor }
						{ $x/time/start_time }
						{ $x/time/end_time }
					</course>
}
</body>
</html>